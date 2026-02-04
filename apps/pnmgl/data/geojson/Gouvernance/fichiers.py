import os

# Fonction pour créer le fichier JavaScript pour chaque fichier .geojson
def generate_js_files(base_directory):
    # Obtenir le répertoire où le script Python se trouve
    output_directory = os.path.dirname(os.path.abspath(__file__))  # Le dossier où le script est exécuté
    
    # Crée le dossier de sortie 'javascript' s'il n'existe pas
    js_folder = os.path.join(output_directory, 'javascript')
    os.makedirs(js_folder, exist_ok=True)

    # Parcourt tous les fichiers et sous-dossiers du répertoire de base
    for root, dirs, files in os.walk(base_directory):
        for file in files:
            # Vérifie si le fichier est un fichier .geojson
            if file.endswith(".geojson"):
                # Récupère les sous-dossiers dans le chemin relatif à partir du dossier de base
                relative_path = os.path.relpath(root, base_directory)
                
                # Remplace les séparateurs de dossier par '/' (indépendamment du système)
                relative_path = relative_path.replace(os.sep, '/')

                # Récupère le nom du fichier sans l'extension
                geojson_name = os.path.splitext(file)[0]

                # Crée le contenu du fichier JavaScript
                js_content = f"""
const layer = new ol.layer.Vector({{
    source: new ol.source.Vector({{

        url: 'apps/pnmgl/data/geojson/{relative_path}/{file}',
        format: new ol.format.GeoJSON()

    }}),

    // style: new ol.style.Style({{
    //     stroke: new ol.style.Stroke({{
    //       color: "rgba(46,83,103,0.6)",
    //       width: 1,
    //     }}),
    //     fill: new ol.style.Fill({{
    //       color: "rgba(0, 0, 0, 0)",
    //     }}),
    // }}),
}});

new CustomLayer('{geojson_name}', layer);
"""

                # Crée le chemin du fichier JavaScript, incluant les sous-dossiers
                js_file_path = os.path.join(js_folder, relative_path, f"{geojson_name}.js")
                
                # Crée les sous-dossiers nécessaires pour l'enregistrement des fichiers JavaScript
                os.makedirs(os.path.dirname(js_file_path), exist_ok=True)
                
                # Écrit le fichier JavaScript
                with open(js_file_path, 'w') as js_file:
                    js_file.write(js_content)
                print(f"Fichier JavaScript créé : {js_file_path}")

# Spécifie le répertoire de base des fichiers .geojson (le dossier parent du script)
generate_js_files(os.path.dirname(os.path.abspath(__file__)))  # Cela utilisera le dossier où se trouve le script
