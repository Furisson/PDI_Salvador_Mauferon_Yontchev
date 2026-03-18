import json
from pathlib import Path

# =========================================
# PARAMÈTRES À ADAPTER
# =========================================

DOSSIER_GEOJSON = Path("apps/pnmgl/data/geojson")
FICHIER_SORTIE = Path("layer.json")

# Mapping manuel optionnel : nom de fichier sans extension -> projet
PROJET_PAR_FICHIER = {
    # "us_med_PNMGL_cale_de_mise_a_leau_ofb_pt_4326": "Pratique de nettoyage des plages"
}

# =========================================
# OUTILS
# =========================================

def lire_geojson(fichier: Path):
    """
    Lecture d'un fichier GeoJSON et retour de son contenu sous forme de dictionnaire.

    Attributes:
        fichier (Path): Le chemin vers le fichier GeoJSON à lire.

    Returns:
        dict: Un dictionnaire représentant le contenu du fichier GeoJSON.
    """
    with fichier.open("r", encoding="utf-8") as f:
        return json.load(f)

def extraire_projet(data: dict, nom_fichier: str) -> str:
    """
    Cherche d'abord 'projet' dans les propriétés d'une feature, sinon utilise le mapping manuel.

    Attributes:
        data (dict): Le contenu du fichier GeoJSON sous forme de dictionnaire.
        nom_fichier (str): Le nom du fichier (sans extension) pour le mapping manuel.

    Returns:
        str: Le projet associé à ce fichier, ou une chaîne vide si aucun projet trouvé.
    """
    features = data.get("features", [])

    for feature in features:
        properties = feature.get("properties", {})
        projet = properties.get("projet")
        if projet not in [None, ""]:
            return projet

    return PROJET_PAR_FICHIER.get(nom_fichier, "")

def construire_layer_json(dossier: Path):
    """
    Parse tous les fichiers GeoJSON d'un dossier, extrait le projet associé à chacun, et construit une liste de couches pour le layer.json.

    Attributes:
        dossier (Path): Le chemin vers le dossier contenant les fichiers GeoJSON.
    Returns:
        list: Une liste de dictionnaires représentant les couches à inclure dans le layer.json.
    """
    couches = []

    for fichier in sorted(dossier.rglob("*.geojson")):
        try:
            data = lire_geojson(fichier)
        except Exception as e:
            print(f"[ERREUR] Lecture impossible : {fichier} -> {e}")
            continue

        nom_fichier = fichier.stem
        projet = extraire_projet(data, nom_fichier)

        couche = {
            "name": nom_fichier
        }

        if projet:
            couche["projet"] = projet

        couches.append(couche)

    return couches

def main():
    couches = construire_layer_json(DOSSIER_GEOJSON)

    with FICHIER_SORTIE.open("w", encoding="utf-8") as f:
        json.dump(couches, f, ensure_ascii=False, indent=2)

    print(f"{len(couches)} couche(s) écrite(s) dans {FICHIER_SORTIE}")

if __name__ == "__main__":
    main()