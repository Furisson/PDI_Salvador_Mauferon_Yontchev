import os
import unicodedata
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
from requests.auth import HTTPBasicAuth
import zipfile
import json
import fiona
import shutil
import geopandas as gpd
import re

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
    """
    Test si un theme existe déjà dans le geoserver

    Attributes:
        workspace_name (str): nom du theme à tester
    Returns:
        bool: True si le theme existe, False sinon
    """
    url = f"{GEOSERVER_URL}/rest/workspaces/{workspace_name}.json"
    r = requests.get(url, auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    return r.status_code == 200

def datastore_exists(workspace_name, datastore_name):
    """
    Test si un groupe existe déjà dans le geoserver

    Attributes:
        workspace_name (str): nom du theme du groupe
        datastore_name (str): nom du groupe à tester
    Returns:
        bool: True si le groupe existe, False sinon
    """
    url = f"{GEOSERVER_URL}/rest/workspaces/{workspace_name}/datastores/{datastore_name}.json"
    r = requests.get(url, auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    return r.status_code == 200

def normalize_name(name):
    """
    Normalise un nom de couche ou de thème pour créer des identifiants compatibles avec GeoServer et mViewer
    - Supprime les accents
    - Remplace les caractères spéciaux par des underscores
    - Remplace les espaces par des underscores
    - Met en minuscules

    Attributes:
        name (str): nom à normaliser
    Returns:
        str: nom normalisé
    """
    nfkd_form = unicodedata.normalize('NFKD', name)
    no_accents = "".join([c for c in nfkd_form if not unicodedata.combining(c)])

    cleaned = re.sub(r"[^\w\s]", "_", no_accents)  # garde lettres, chiffres et espaces

    cleaned = re.sub(r"\s+", "_", cleaned)

    return cleaned.lower()

def save_layer_metadata(layer_name, theme, group, icon, style):
    """
    Sauvegarde les métadonnées de la couche dans un fichier JSON local pour pouvoir les réutiliser dans le config.xml de mViewer

    Attributes:
        layer_name (str): nom de la couche
        theme (str): thème de la couche
        group (str): groupe de la couche
        icon (str): icône du thème
        style (str): nom du style de la couche

    Returns:
        None
    """
    data = []

    if os.path.exists("layers.json"):
        with open("layers.json", "r") as f:
            data = json.load(f)

    theme_clean = normalize_name(theme)

    data.append({
        "name": layer_name,
        "theme": theme_clean,
        "icon": icon,
        "group" : group,
        "style": style
    })

    with open("layers.json", "w") as f:
        json.dump(data, f, indent=4)

def generate_config_xml():
    """
    Génère dynamiquement le fichier config.xml de mViewer en fonction des couches présentes dans le fichier layers.json, qui contient les métadonnées des couches uploadées par l'utilisateur.
    
    Attributes :
        None

    Returns :
        None
    """
    with open("layers.json", "r") as f:
        layers = json.load(f)

    xml_content = """<?xml version="1.0" encoding="UTF-8"?>
    <config>
        <!-- Définition des paramètres généraux de l'application  -->
    <application id='stats' title="Mviewer Parc Naturel Marin du Golfe du Lion" mouseposition="false" logo="apps/pnmgl/img/logo_pnmgl.png" help="mviewer_help.html" measuretools="true" addlayerstools="true" mapprint="true" exportpng="true" style="css/themes/pnmgl.css" togglealllayersfromtheme="true"/>
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

        <themes>
    """

    # Ajout des couches par défaut (non modifiables depuis l'interface)
    file_default_layers = "./apps/pnmgl/default_layers.xml"

    with open(file_default_layers, "r", encoding="utf-8") as f:
        default_layers = f.read()

    xml_content += default_layers

    themes = {}
    groups = {}
    icons = {}

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
        icons[theme] = group[0]["icon"]  # Utiliser l'icône du premier layer du groupe

    # Générer le XML pour chaque thème et groupe
    for theme_name, theme_layers in themes.items():
        theme_name_unclean = theme_name.replace("_", " ").title()
        xml_content += f'        <theme name="{theme_name_unclean}" collapsed="true" id="{theme_name}" icon="{icons[theme_name]}">\n'
        for group in theme_layers:
            xml_content += f'''
            <group name="{group[0]["group"]}" id ="{normalize_name(group[0]["group"])}">
            '''
            for layer in group:
                layer_name = normalize_name(layer["name"])
                xml_content += f'''
                <layer id="{layer["theme"]}:{layer_name}"
                name="{layer["name"]}"
                type="geojson"
                opacity="1"
                visible="false"
                searchable="true"   
                queryable="true"
                vectorlegend="true"
                style="{layer["style"]}"
                url="{GEOSERVER_URL}/{layer["theme"]}/ows?service=WFS&amp;version=1.0.0&amp;request=GetFeature&amp;typeName={layer["theme"]}:{layer_name}&amp;outputFormat=application/json&amp;srsname=EPSG:3857"
                typeName="{layer["theme"]}:{layer_name}"
                srs="EPSG:3857"
                format="application/json">
                <template url="apps/pnmgl/templates/defaut.mst" />
            </layer>
            '''
            xml_content += "</group>\n"
        xml_content += "</theme>\n"


    xml_content += """</themes>
    </config>
    """

    with open("./apps/default.xml", "w", encoding="utf-8") as f:
        f.write(xml_content)

def generate_style(style, nom_style, type_geom):
    """
    Génère une fonction de style JavaScript à partir des paramètres de style définis par l'utilisateur et l'ajoute au fichier featurestyles.js de mViewer, si elle n'existe pas déjà.

    Attributes:
        style (dict): dictionnaire contenant les paramètres de style (stroke, fill, width)
        nom_style (str): nom du style à créer (ex: "theme_layer_style")
        type_geom (str): type de géométrie de la couche ("Point", "LineString", "Polygon")

    Returns:
        None
    """
    # Chemin vers ton featurestyles.js
    js_file_path = "./js/featurestyles.js"

    # Nouveau style JS à ajouter
    new_style_js = f"""
    mviewer.featureStyles.{nom_style} = function(feature) {{
        return new ol.style.Style({{
            stroke: new ol.style.Stroke({{
                color: "{style['stroke']}",
                width: {style['width']}
            }}),
            fill: new ol.style.Fill({{
                color: "{style['fill']}"
            }})
        }});
    }};
    """

    new_style_js_point = f"""
    mviewer.featureStyles.{nom_style} = function(feature) {{
        return new ol.style.Style({{
            image: new ol.style.Circle({{
                radius: 7,
                fill: new ol.style.Fill({{
                    color: "{style['fill']}"
                }}),
                stroke: new ol.style.Stroke({{
                    color: "{style['stroke']}",
                    width: {style['width']}
                }})
            }})
        }});
    }};
    """

    # Lire le fichier existant
    with open(js_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Vérifier si le style existe déjà
    if f"mviewer.featureStyles.{nom_style}" not in content:
        # Ajouter le nouveau style à la fin
        if type_geom == "Point":
            content += "\n" + new_style_js_point
        else:
            content += "\n" + new_style_js

        # Réécrire le fichier
        with open(js_file_path, "w", encoding="utf-8") as f:
            f.write(content)

def publish_layer_to_geoserver(layer_name, shapefile_path, theme):
    """
    Crée un datastore et publie la couche shapefile sur GeoServer

    Attributes:
        layer_name (str): nom de la couche à publier
        shapefile_path (str): chemin vers le fichier shapefile à publier
        theme (str): thème dans lequel publier la couche

    Returns:
        None
    """
    headers = {"Content-Type": "application/xml"}
    
    theme_clean = normalize_name(theme)
    layer_name_clean = normalize_name(layer_name)

    # Déplacer tous les fichiers du shapefile dans un sous-dossier pour le datastore GeoServer
    extensions = [".shp", ".shx", ".dbf", ".prj", ".cpg"]
    file_name = os.path.basename(shapefile_path).replace(".shp", "")
    shp_dir = os.path.join(UPLOAD_FOLDER, file_name).replace("\\", "/")
    os.makedirs(shp_dir, exist_ok=True)
    SHAPEFILE_PATH = os.path.join(shp_dir, os.path.basename(shapefile_path)).replace("\\", "/")
    for ext in extensions:
        src = shapefile_path.replace(".shp", ext)
        dst = os.path.join(shp_dir, os.path.basename(src))
        if os.path.exists(src) and not os.path.exists(dst):
            shutil.move(src, dst)

    # Création du workspace
    if not workspace_exists(theme_clean):
        url_workspace = f"{GEOSERVER_URL}/rest/workspaces"
        xml_workspace = f"""<workspace>
        <name>{theme_clean}</name>
        </workspace>"""
        r_workspace = requests.post(url_workspace, data=xml_workspace, headers=headers,
                                    auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
        if r_workspace.status_code not in [201, 202]:
            raise Exception(f"Erreur création workspace: {r_workspace.status_code} {r_workspace.text}")
    
    # Création du datastore 
    datastore_name = shp_dir.split("/")[-1]
    if not datastore_exists(theme_clean, datastore_name):
        url_datastore = f"{GEOSERVER_URL}/rest/workspaces/{theme_clean}/datastores"
        xml_datastore = f"""<dataStore>
        <name>{datastore_name}</name>
        <connectionParameters>
            <entry key="url">file:{shp_dir}</entry>
            <entry key="namespace">{theme_clean}</entry>
        </connectionParameters>
        </dataStore>"""
        r_datastore = requests.post(url_datastore, data=xml_datastore, headers=headers,
                                    auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
        if r_datastore.status_code not in [201, 202]:
            raise Exception(f"Erreur création datastore: {r_datastore.status_code} {r_datastore.text}")

    # Nom de la couche = layer_name
    with fiona.open(SHAPEFILE_PATH, "r") as source:
        src_crs = source.crs
    url_layer = f"{GEOSERVER_URL}/rest/workspaces/{theme_clean}/datastores/{datastore_name}/featuretypes?recalculate=nativebbox,latlonbbox"
    xml_layer = f"""
    <featureType>
        <name>{layer_name_clean}</name>
        <title>{layer_name_clean}</title>
        <srs>{src_crs}</srs>
        <nativeName>{os.path.basename(shapefile_path).replace('.shp', '')}</nativeName>
    </featureType>
    """
    r_layer = requests.post(url_layer, data=xml_layer, headers=headers,
                            auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    if r_layer.status_code not in [201, 202]:
        raise Exception(f"Erreur publication couche: {r_layer.status_code} {r_layer.text}")


############################ ROUTES FLASK ############################

# --- Endpoint upload ---
@app.route("/upload", methods=["POST"])
def upload_file():
    """
    Reçoit un fichier shapefile zip ou geojson + info (nom, theme, group, icon, style)
    Dépose dans le dossier uploads et publie sur GeoServer

    Attributes:
        None (les données sont envoyées dans la requête POST)

    Returns:
        JSON contenant le succès ou l'erreur, le nom de la couche, son id (theme:layer) et son url WFS pour l'affichage dans mViewer
    """
    # --- Récupérer les informations ---
    layer_name = request.form.get("layer_name")
    theme = request.form.get("theme")
    group = request.form.get("group")
    icon = request.form.get("icon")
    style = json.loads(request.form.get("style"))
    
    if "file" not in request.files:
        return jsonify({"error": "Aucun fichier envoyé"}), 400
    
    file = request.files["file"]
    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Si zip, dézipper
    if filename.endswith(".zip"):
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(app.config['UPLOAD_FOLDER'])
        # récupérer le nom du shapefile principal
        for f in os.listdir(app.config['UPLOAD_FOLDER']):
            if f.endswith(".shp"):
                shapefile_path = os.path.join(app.config['UPLOAD_FOLDER'], f).replace("\\", "/")
                break
    else:
        return jsonify({"error": "Format non supporté"}), 400

    # Normaliser le nom des attributs de la couche
    gdf = gpd.read_file(shapefile_path)
    type_geom = gdf.geom_type.iloc[0]
    gdf = gdf.rename(columns=lambda x: x.replace(" ", "_").lower())
    gdf = gdf.rename(columns={
        "sources": "source",
    })
    columns = gdf.columns.str
    if columns.contains("source").any() or columns.contains("auteur").any() or columns.contains("maj").any():
        gdf["info"] = True
    else:
        gdf["info"] = False
    if columns.contains("nb_payantes").any() or columns.contains("nb_gratuites").any() or columns.contains("import_t").any() or columns.contains("export_t").any():
        gdf["cara"] = True
    else:
        gdf["cara"] = False
    if columns.contains("regl_mdtx").any() or columns.contains("cat_regl").any() or columns.contains("arrete_nom").any() or columns.contains("regl_type").any() or columns.contains("info_regl").any() or columns.contains("actv_inter").any():
        gdf["regl"] = True
    else:
        gdf["regl"] = False
    if columns.contains("id").any() or columns.contains("num").any() or columns.contains("fid").any() or columns.contains("id_bdd").any():
        gdf["tech"] = True
    else:
        gdf["tech"] = False
    gdf.to_file(shapefile_path, driver='ESRI Shapefile')

    # Publier sur GeoServer via REST 
    try:
        publish_layer_to_geoserver(layer_name, shapefile_path, theme)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    nom_style = f"{normalize_name(theme)}_{normalize_name(layer_name)}_style"
    generate_style(style, nom_style, type_geom)
    save_layer_metadata(layer_name, theme, group, icon, nom_style)
    generate_config_xml()

    return jsonify({"success": "true", "layer": layer_name, "id": f"{normalize_name(theme)}:{normalize_name(layer_name)}", "url": f"{GEOSERVER_URL}/{normalize_name(theme)}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName={normalize_name(theme)}:{normalize_name(layer_name)}&outputFormat=application/json&srsname=EPSG:3857"})

@app.route("/reload_config")
def serve_config():
    generate_config_xml() 
    return send_file("./apps/default.xml", mimetype="application/xml")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
