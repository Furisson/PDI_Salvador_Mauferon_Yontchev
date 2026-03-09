import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
from requests.auth import HTTPBasicAuth
import zipfile
import json
import fiona
import shutil

# --- Configuration ---
UPLOAD_FOLDER = "C:/Geoserver_data/uploads"
GEOSERVER_URL = "http://localhost:8080/geoserver"
GEOSERVER_USER = "admin"
GEOSERVER_PASSWORD = "geoserver"
SHAPEFILE_PATH = ""

# Créer dossier uploads si inexistant
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def workspace_exists(workspace_name):
    url = f"{GEOSERVER_URL}/rest/workspaces/{workspace_name}.json"
    r = requests.get(url, auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    return r.status_code == 200

def datastore_exists(workspace_name, datastore_name):
    url = f"{GEOSERVER_URL}/rest/workspaces/{workspace_name}/datastores/{datastore_name}.json"
    r = requests.get(url, auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    return r.status_code == 200

def save_layer_metadata(layer_name, theme, group):
    data = []

    if os.path.exists("layers.json"):
        with open("layers.json", "r") as f:
            data = json.load(f)

    data.append({
        "name": layer_name,
        "theme": theme,
        "group": group
    })

    with open("layers.json", "w") as f:
        json.dump(data, f, indent=4)

def generate_config_xml():
    with open("layers.json", "r") as f:
        layers = json.load(f)

    xml_content = """<?xml version="1.0" encoding="UTF-8"?>
    <config>
        <!-- Définition des paramètres généraux de l'application  -->
    <application id='stats' title="Mviewer Parc Naturel Marin du Golfe du Lion" mouseposition="false" logo="apps/pnmgl/img/logo_pnmgl.png" help="mviewer_help.html" measuretools="true" mapprint="true" exportpng="true" style="css/themes/pnmgl.css" togglealllayersfromtheme="true"/>
    <mapoptions maxzoom="19" projection="EPSG:3857" center="374538.481483,5269369.993240" zoom="10" projextent="-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244" />

    <!-- Fonds de cartes au choix -->
    <baselayers style="gallery">
        <baselayer  
            type="WMTS" 
            id="ortho" 
            label="Photo aérienne IGN" 
            title="GéoPortail" 
            maxscale="1000" 
            thumbgallery="img/basemap/ortho.jpg"
            url="https://data.geopf.fr/wmts" 
            layers="ORTHOIMAGERY.ORTHOPHOTOS" 
            format="image/jpeg" 
            visible="false" 
            fromcapacity="false"
            attribution="&lt;a href='https://geoservices.ign.fr/services-geoplateforme-diffusion' target='_blank'>&lt;img src='img/basemap/geoservices.png'>&lt;/a>" 
            style="normal" 
            matrixset="PM" 
            maxzoom="22"/>
        
        <baselayer  
            type="WMS" 
            id="osm" 
            label="OpenStreetMap" 
            title="Plan OSM Géobretagne" 
            thumbgallery="img/basemap/osm.png"
            url="https://tile.geobretagne.fr/osm/service" 
            layers="osm:grey" 
            format="image/png" 
            visible="true"
            attribution="GéoBretagne. Données : OFB, les contributeurs d'&lt;a href='https://www.openstreetmap.org/' target='_blank'>OpenStreetMap &lt;/a>,  &lt;a href='https://www.openstreetmap.org/copyright' target='_blank'>ODbL &lt;/a>" />
            
    </baselayers>

    <!-- ajout de la fonctionnalité de recherche -->
    <extensions>
    <extension type="component" id="layerfilter" path="demo/addons"/>
    </extensions>

    <!-- Appel de la fonctionnalité de statistiques -->
    <extensions>
    <extension type="component" id="stats" path="apps/pnmgl"/>
    </extensions>

    <!-- Appel de la fonctionnalité d'ajout de couches -->
    <extensions>
    <extension type="component" id="add_layer" path="apps/pnmgl"/>
    </extensions>

        <themes>
        <theme name="Eco"  collapsed="true" id="eco" icon="fas fa-leaf">
        </theme>
        <theme name="Gouvernance"  collapsed="true" id="gouvernance" icon="fas fa-globe">
        </theme>
    """

    themes = {}
    groups = {}

    # Regrouper par groupe
    for layer in layers:
        group = layer["group"]
        if group not in groups:
            groups[group] = []
        groups[group].append(layer)

    # Regrouper par thème
    for group in groups.values():
        theme = group[0]["theme"]  # Utiliser le thème du premier layer du groupe
        if theme not in themes:
            themes[theme] = []
        themes[theme].append(group)

    for theme_name, theme_layers in themes.items():
        xml_content += f'        <theme name="{theme_name}" collapsed="true" id="{theme_name.replace(" ", "_").lower()}" icon="fas fa-ship">\n'
        for group in theme_layers:
            xml_content += f'''
            <group name="{group[0]["group"]}" id ="{group[0]["group"].replace(" ", "_").lower()}">
            '''
            for layer in group:
                xml_content += f'''
                <layer id="{layer["theme"]}:{layer["name"].replace(" ", "_").lower()}"
                name="{layer["name"]}"
                type="geojson"
                opacity="1"
                visible="false"
                queryable="true"
                url="{GEOSERVER_URL}/{layer["theme"]}/ows?service=WFS&amp;version=1.0.0&amp;request=GetFeature&amp;typeName={layer["theme"]}:{layer["name"]}&amp;outputFormat=application/json&amp;srsname=EPSG:3857"
                typeName="{layer["theme"]}:{layer["name"]}"
                srs="EPSG:3857"
                format="application/json">
            </layer>
            '''
            xml_content += "</group>\n"
        xml_content += "</theme>\n"


    xml_content += """</themes>
    </config>
    """

    with open("./apps/default.xml", "w", encoding="utf-8") as f:
        f.write(xml_content)

# --- Endpoint upload ---
@app.route("/upload", methods=["POST"])
def upload_file():
    """
    Reçoit un fichier shapefile zip ou geojson + info (nom, theme, group)
    Dépose dans le dossier uploads et publie sur GeoServer
    """
    # --- Récupérer les informations ---
    layer_name = request.form.get("layer_name")
    theme = request.form.get("theme")
    group = request.form.get("group")
    
    if "file" not in request.files:
        return jsonify({"error": "Aucun fichier envoyé"}), 400
    
    file = request.files["file"]
    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # --- Si zip, dézipper ---
    if filename.endswith(".zip"):
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(app.config['UPLOAD_FOLDER'])
        os.remove(filepath)  # supprimer le zip après extraction
        # récupérer le nom du shapefile principal
        for f in os.listdir(app.config['UPLOAD_FOLDER']):
            if f.endswith(".shp"):
                shapefile_path = os.path.join(app.config['UPLOAD_FOLDER'], f).replace("\\", "/")
                break
    elif filename.endswith(".geojson"):
        shapefile_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    else:
        return jsonify({"error": "Format non supporté"}), 400

    # --- Publier sur GeoServer via REST ---
    try:
        publish_layer_to_geoserver(layer_name, shapefile_path, theme)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    save_layer_metadata(layer_name, theme, group)
    generate_config_xml()

    return jsonify({"status": "success", "layer": layer_name})

@app.route("/reload_config")
def serve_config():
    generate_config_xml() 
    return send_file("./apps/default.xml", mimetype="application/xml")

# --- Fonction utilitaire pour GeoServer REST ---
def publish_layer_to_geoserver(layer_name, shapefile_path, theme):
    """
    Crée un datastore et publie la couche shapefile sur GeoServer
    """
    headers = {"Content-Type": "application/xml"}
    # Extensions du shapefile
    extensions = [".shp", ".shx", ".dbf", ".prj", ".cpg"]
    shp_dir = os.path.join(UPLOAD_FOLDER, layer_name).replace("\\", "/")
    os.makedirs(shp_dir, exist_ok=True)
    SHAPEFILE_PATH = os.path.join(shp_dir, os.path.basename(shapefile_path)).replace("\\", "/")
    for ext in extensions:
        src = shapefile_path.replace(".shp", ext)
        dst = os.path.join(shp_dir, os.path.basename(src))
        if os.path.exists(src) and not os.path.exists(dst):
            shutil.move(src, dst)

    # Création du workspace
    if not workspace_exists(theme):
        url_workspace = f"{GEOSERVER_URL}/rest/workspaces"
        xml_workspace = f"""<workspace>
        <name>{theme}</name>
        </workspace>"""
        r_workspace = requests.post(url_workspace, data=xml_workspace, headers=headers,
                                    auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
        if r_workspace.status_code not in [201, 202]:
            raise Exception(f"Erreur création workspace: {r_workspace.status_code} {r_workspace.text}")
    
    # Création du datastore 
    datastore_name = shp_dir.split("/")[-1]
    if not datastore_exists(theme, datastore_name):
        url_datastore = f"{GEOSERVER_URL}/rest/workspaces/{theme}/datastores"
        xml_datastore = f"""<dataStore>
        <name>{datastore_name}</name>
        <connectionParameters>
            <entry key="url">file:{shp_dir}</entry>
            <entry key="namespace">{theme}</entry>
        </connectionParameters>
        </dataStore>"""
        r_datastore = requests.post(url_datastore, data=xml_datastore, headers=headers,
                                    auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
        if r_datastore.status_code not in [201, 202]:
            raise Exception(f"Erreur création datastore: {r_datastore.status_code} {r_datastore.text}")

    # Nom de la couche = layer_name
    with fiona.open(SHAPEFILE_PATH, "r") as source:
        src_crs = source.crs
    url_layer = f"{GEOSERVER_URL}/rest/workspaces/{theme}/datastores/{datastore_name}/featuretypes?recalculate=nativebbox,latlonbbox"
    xml_layer = f"""
    <featureType>
        <name>{layer_name}</name>
        <title>{layer_name}</title>
        <srs>{src_crs}</srs>
        <nativeName>{os.path.basename(shapefile_path).replace('.shp', '')}</nativeName>
    </featureType>
    """
    r_layer = requests.post(url_layer, data=xml_layer, headers=headers,
                            auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    if r_layer.status_code not in [201, 202]:
        raise Exception(f"Erreur publication couche: {r_layer.status_code} {r_layer.text}")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
