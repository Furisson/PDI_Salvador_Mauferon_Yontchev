import os
from flask import Flask, request, jsonify
import requests
from requests.auth import HTTPBasicAuth
import zipfile
import subprocess
import fiona
from fiona.crs import from_epsg
import shapely
from shapely.geometry import shape, mapping
from pyproj import Transformer

# --- Configuration ---
UPLOAD_FOLDER = "C:/Geoserver_data/uploads"
GEOSERVER_URL = "http://localhost:8080/geoserver"
GEOSERVER_USER = "admin"
GEOSERVER_PASSWORD = "geoserver"

# Créer dossier uploads si inexistant
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def convert_to_lambert93_py(shapefile_input, shapefile_output):
    """
    Convertit un shapefile en EPSG:2154 (Lambert-93)
    shapefile_input : chemin du shapefile original
    shapefile_output : chemin du shapefile converti
    """
    # Détecter CRS d'entrée (EPSG si présent)
    with fiona.open(shapefile_input, "r") as source:
        src_crs = source.crs
        # Transformer toutes les géométries
        transformer = Transformer.from_crs(src_crs, 2154, always_xy=True)

        # Créer le shapefile de sortie
        schema = source.schema.copy()
        with fiona.open(
            shapefile_output, "w",
            driver="ESRI Shapefile",
            crs=from_epsg(2154),
            schema=schema
        ) as dest:
            for feat in source:
                geom = shape(feat["geometry"])
                # Transformer chaque point
                geom_transformed = shapely.ops.transform(transformer.transform, geom)
                feat["geometry"] = mapping(geom_transformed)
                dest.write(feat)

def workspace_exists(workspace_name):
    url = f"{GEOSERVER_URL}/rest/workspaces/{workspace_name}.json"
    r = requests.get(url, auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    return r.status_code == 200

def datastore_exists(workspace_name, datastore_name):
    url = f"{GEOSERVER_URL}/rest/workspaces/{workspace_name}/datastores/{datastore_name}.json"
    r = requests.get(url, auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    return r.status_code == 200

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

    # --- Convertir en Lambert-93 si nécessaire ---
    convert_to_lambert93_py(shapefile_path, shapefile_path) 

    # --- Publier sur GeoServer via REST ---
    try:
        publish_layer_to_geoserver(layer_name, shapefile_path, theme, group)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # --- TODO: enregistrer theme / group en base si nécessaire ---
    
    return jsonify({"status": "success", "layer": layer_name})


# --- Fonction utilitaire pour GeoServer REST ---
def publish_layer_to_geoserver(layer_name, shapefile_path, theme, group):
    """
    Crée un datastore et publie la couche shapefile sur GeoServer
    """
    headers = {"Content-Type": "application/xml"}

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
    if not datastore_exists(theme, group):
        url_datastore = f"{GEOSERVER_URL}/rest/workspaces/{theme}/datastores"
        file_path = "/".join(shapefile_path.split("/")[0:])
        print(shapefile_path)
        xml_datastore = f"""<dataStore>
        <name>{group}</name>
        <connectionParameters>
            <entry key="url">file:{file_path}</entry>
            <entry key="namespace">{theme}</entry>
        </connectionParameters>
        </dataStore>"""
        r_datastore = requests.post(url_datastore, data=xml_datastore, headers=headers,
                                    auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
        if r_datastore.status_code not in [201, 202]:
            raise Exception(f"Erreur création datastore: {r_datastore.status_code} {r_datastore.text}")

    # Nom de la couche = layer_name
    url_layer = f"{GEOSERVER_URL}/rest/workspaces/{theme}/datastores/{group}/featuretypes"
    xml_layer = f"""
    <featureType>
        <name>{layer_name}</name>
        <title>{layer_name}</title>
        <srs>EPSG:2154</srs>
        <nativeName>{os.path.basename(shapefile_path).replace('.shp', '')}</nativeName>
    </featureType>
    """
    r_layer = requests.post(url_layer, data=xml_layer, headers=headers,
                            auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD))
    if r_layer.status_code not in [201, 202]:
        raise Exception(f"Erreur publication couche: {r_layer.status_code} {r_layer.text}")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
