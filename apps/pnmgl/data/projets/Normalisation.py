import json
from pathlib import Path
from copy import deepcopy

# =========================================================
# PARAMÈTRES À ADAPTER
# =========================================================

DOSSIER_GEOJSON = Path("apps/pnmgl/data/geojson")

# False = crée des fichiers *_normalise.geojson
# True = écrase les fichiers existants
ECRASER_FICHIERS = True

SUFFIXE_SORTIE = "_normalise"

# Associe un nom de fichier geojson (sans extension) à un projet
# Exemple :
# "nettoyage_plages": "Pratique de nettoyage des plages"
PROJET_PAR_DOSSIER = {
    "EMR" : "Images satellites et suivis environnementaux",
    "Eoliennes" :"Erosion de la côte Vermeille",
    "Epaves" : "Etat des lieux de la pêche artisanale",
    "Etude prospective tdc 2050" : "Etat des lieux de la pêche artisanale",
    "Gouvernance" : "Eutrophisation du Golfe du Lion",
    "Inventaire ouvrages côtiers" : "La biodiversité du Parc",
    "Jetski" : "Perception des activités de plongées et de plaisance",
    "Kayak" : "Perception des activités de plongées et de plaisance",
    "Localisation des structures de loisir" : "Perception des activités de plongées et de plaisance",
    "Macrozone" : "Les dunes sableuses",
    "Nettoyage" : "Pratique de nettoyage des plages",
    "Plan balisage plages" : "Pratique de nettoyage des plages",
    "Ports et transport maritime" : "La pêche de loisir",
    "Recifs" : "L'Herbier de posidonie",
    "Recupnet" : "Recyclage des filets de pêche",
    "RESOBLO" : "Panaches turbides",
    "Sites de plongee" : "Perception des activités de plongées et de plaisance",
    "Trait de cote" :"Evolution trait de cote",
    "Zones de mouillage" : "Etat des lieux de la pêche artisanale"
}

# =========================================================
# CHAMPS NORMALISÉS
# =========================================================

CHAMPS_CIBLES = [
    "nom",
    "source",
    "auteur",
    "maj",

    "nb_payante",
    "nb_gratuite",
    "import_t",
    "export_t",
    "etiquette",

    "regl_type",
    "regl_medtx",
    "cat_regl",
    "info_regl",
    "arrete_nom",
    "actv_inter",

    "id",
    "id_bdd",
    "fid",
    "num",

    "info",
    "cara",
    "regl",
    "tech",

    "projet",
]

# Variantes possibles trouvées dans les données
CORRESPONDANCES = {
    "nom": [
        "nom", "Nom", "NOM", "name", "Name", "NAME",
        "Port", "port", "PORT", "nom_acti", "Nom_acti",
        "title", "Title", "titre", "Titre"
    ],
    "source": [
        "source", "Source", "SOURCE", "sources", "Sources", "SOURCES"
    ],
    "auteur": [
        "auteur", "Auteur", "AUTEUR", "author", "Author", "AUTHOR"
    ],
    "maj": [
        "maj", "MAJ", "Maj", "date_maj", "Date_maj", "mise_a_jour", "Mise_a_jour"
    ],

    "nb_payante": [
        "nb_payante", "NB_payante", "NB_Payante", "nb_payant"
    ],
    "nb_gratuite": [
        "nb_gratuite", "Nb_gratuite", "NB_gratuite", "Nb_Gratuit", "nb_gratuit"
    ],
    "import_t": [
        "import_t", "import_T", "Import_T", "IMPORT_T"
    ],
    "export_t": [
        "export_t", "export_T", "Export_T", "EXPORT_T"
    ],
    "etiquette": [
        "etiquette", "Etiquette", "ETIQUETTE", "label", "Label"
    ],

    "regl_type": [
        "regl_type", "Regl_type", "REGL_TYPE", "reglement_type"
    ],
    "regl_medtx": [
        "regl_medtx", "Regl_medtx", "REGL_MEDTX", "reglement_texte"
    ],
    "cat_regl": [
        "cat_regl", "Cat_regl", "CAT_REGL", "categorie_reglement"
    ],
    "info_regl": [
        "info_regl", "Info_regl", "INFO_REGL", "information_reglement"
    ],
    "arrete_nom": [
        "arrete_nom", "Arrete_nom", "ARRETE_NOM", "nom_arrete"
    ],
    "actv_inter": [
        "actv_inter", "Actv_inter", "ACTV_INTER", "activite_interdite"
    ],

    "id": [
        "id", "ID", "Id"
    ],
    "id_bdd": [
        "id_bdd", "ID_BDD", "Id_bdd", "idbdd"
    ],
    "fid": [
        "fid", "FID", "Fid"
    ],
    "num": [
        "num", "NUM", "Num", "numero", "Numero"
    ],

    "projet": [
        "projet", "Projet", "PROJET"
    ],
}

# =========================================================
# OUTILS
# =========================================================

def valeur_non_vide(valeur) -> bool:
    """
    Retourne True si la valeur est considérée comme exploitable.
    
    Attributes:
        valeur: La valeur à évaluer.

    Returns:
        bool: True si la valeur est non nulle et non vide, False sinon.
    """
    if valeur is None:
        return False
    if isinstance(valeur, str) and valeur.strip() == "":
        return False
    return True


def premiere_valeur(properties: dict, candidats: list):
    """
    Retourne la première valeur non vide trouvée parmi une liste de clés candidates.
    
    Attributes:
        properties (dict): Le dictionnaire de propriétés à rechercher.
        candidats (list): Une liste de clés à tester dans l'ordre de priorité.
    Returns:
        La première valeur non vide trouvée, ou une chaîne vide si aucune n'est trouvée.
    """
    for cle in candidats:
        if cle in properties and valeur_non_vide(properties[cle]):
            return properties[cle]
    return ""


def determiner_projet(nom_dossier: str) -> str:
    """
    Détermine le nom du projet à partir des propriétés ou du nom de fichier.

    Attributes:
        nom_dossier (str): Le nom du dossier contenant le fichier.

    Returns:
        str: Le nom du projet lié.
    """
    projet_existant = PROJET_PAR_DOSSIER[nom_dossier] if nom_dossier in PROJET_PAR_DOSSIER else ""
    if valeur_non_vide(projet_existant):
        return projet_existant
    else:
        print(f"[AVERTISSEMENT] Le dossier '{nom_dossier}' n'est pas référencé dans PROJET_PAR_DOSSIER.")
        raise Exception(f"Le projet n'est pas renseigné dans les propriétés du fichier")


def construire_booleens(props: dict) -> dict:
    """
    Construit les booléens de sections attendus par le template.
    
    Attributes:
        props (dict): Un dictionnaire de propriétés d'une feature.

    Returns:
        dict: Un dictionnaire contenant les booléens 'info', 'cara', 'regl', 'tech'.
    """
    info = any([
        valeur_non_vide(props.get("nom")),
        valeur_non_vide(props.get("source")),
        valeur_non_vide(props.get("auteur")),
        valeur_non_vide(props.get("maj")),
    ])

    cara = any([
        valeur_non_vide(props.get("nb_payante")),
        valeur_non_vide(props.get("nb_gratuite")),
        valeur_non_vide(props.get("import_t")),
        valeur_non_vide(props.get("export_t")),
        valeur_non_vide(props.get("etiquette")),
    ])

    regl = any([
        valeur_non_vide(props.get("regl_type")),
        valeur_non_vide(props.get("regl_medtx")),
        valeur_non_vide(props.get("cat_regl")),
        valeur_non_vide(props.get("info_regl")),
        valeur_non_vide(props.get("arrete_nom")),
        valeur_non_vide(props.get("actv_inter")),
    ])

    tech = any([
        valeur_non_vide(props.get("id")),
        valeur_non_vide(props.get("id_bdd")),
        valeur_non_vide(props.get("fid")),
        valeur_non_vide(props.get("num")),
    ])

    return {
        "info": info,
        "cara": cara,
        "regl": regl,
        "tech": tech,
    }

def normaliser_properties(properties: dict, projet: str) -> dict:
    """
    Construit un dictionnaire de propriétés normalisé dans un ordre fixe.

    L’ordre des champs est volontairement maîtrisé pour produire des fichiers
    GeoJSON lisibles et cohérents avec la logique du template Mviewer :

    - informations générales + booléen `info`
    - caractéristiques + booléen `cara`
    - réglementation + booléen `regl`
    - données techniques + booléen `tech`
    - projet
    - enfin les attributs d’origine non encore repris

    Les champs absents ne sont pas instanciés, à l’exception des booléens
    de section (`info`, `cara`, `regl`, `tech`) qui sont toujours présents.

    Attributes:
        properties (dict): Le dictionnaire de propriétés d’une feature à normaliser.
        projet (str): Le nom du projet à associer à cette feature.

    Returns:
        dict: Un dictionnaire de propriétés normalisé.
    """
    original = deepcopy(properties)
    resultat = {}

    def ajouter_si_present(champ_normalise: str):
        valeur = premiere_valeur(
            original,
            CORRESPONDANCES.get(champ_normalise, [champ_normalise])
        )
        if valeur_non_vide(valeur):
            resultat[champ_normalise] = valeur

    # -----------------------------------------------------
    # 1. Informations générales
    # -----------------------------------------------------
    for champ in ["nom", "source", "auteur", "maj"]:
        ajouter_si_present(champ)

    booleens = construire_booleens({
        **resultat
    })
    resultat["info"] = booleens["info"]

    # -----------------------------------------------------
    # 2. Caractéristiques
    # -----------------------------------------------------
    for champ in ["nb_payante", "nb_gratuite", "import_t", "export_t", "etiquette"]:
        ajouter_si_present(champ)

    booleens = construire_booleens({
        **resultat
    })
    resultat["cara"] = booleens["cara"]

    # -----------------------------------------------------
    # 3. Réglementation
    # -----------------------------------------------------
    for champ in ["regl_type", "regl_medtx", "cat_regl", "info_regl", "arrete_nom", "actv_inter"]:
        ajouter_si_present(champ)

    booleens = construire_booleens({
        **resultat
    })
    resultat["regl"] = booleens["regl"]

    # -----------------------------------------------------
    # 4. Données techniques
    # -----------------------------------------------------
    for champ in ["id", "id_bdd", "fid", "num"]:
        ajouter_si_present(champ)

    booleens = construire_booleens({
        **resultat
    })
    resultat["tech"] = booleens["tech"]

    # -----------------------------------------------------
    # 5. Projet
    # -----------------------------------------------------
    resultat["projet"] = projet

    # -----------------------------------------------------
    # 6. Conserver les attributs d’origine non repris
    # -----------------------------------------------------
    for cle, valeur in original.items():
        if cle not in resultat:
            resultat[cle] = valeur

    return resultat


def normaliser_geojson(fichier: Path, projet: str):
    """
    Normalise toutes les features d’un fichier GeoJSON.
    
    Attributes:
        fichier (Path): Le chemin vers le fichier GeoJSON à normaliser.
        projet (str): Le nom du projet à associer à toutes les features de ce fichier.

    Returns:
        None
    """
    with fichier.open("r", encoding="utf-8") as f:
        data = json.load(f)

    if data.get("type") != "FeatureCollection":
        print(f"[IGNORÉ] {fichier.name} : type non géré ({data.get('type')})")
        return

    features = data.get("features", [])
    compteur = 0

    for feature in features:
        if feature.get("type") != "Feature":
            continue

        properties = feature.get("properties", {})
        feature["properties"] = normaliser_properties(properties, projet)
        compteur += 1

    if ECRASER_FICHIERS:
        sortie = fichier
    else:
        sortie = fichier.with_name(f"{fichier.stem}{SUFFIXE_SORTIE}{fichier.suffix}")

    with sortie.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"[OK] {fichier.name} -> {sortie.name} ({compteur} feature(s) normalisée(s))")


def main():
    dossiers = sorted([p for p in DOSSIER_GEOJSON.iterdir() if p.is_dir()])

    if not dossiers:
        print("Aucun dossier trouvé dans le répertoire GeoJSON.")
        return

    total_fichiers = 0

    for dossier in dossiers:
        projet = determiner_projet(dossier.name)
        fichiers = sorted(dossier.rglob("*.geojson"))

        if not fichiers:
            print(f"[VIDE] {dossier.name} : aucun fichier .geojson")
            continue

        print(f"\n[DOSSIER] {dossier.name} -> projet = {projet}")
        print(f"{len(fichiers)} fichier(s) trouvé(s).")

        for fichier in fichiers:
            try:
                normaliser_geojson(fichier, projet)
                total_fichiers += 1
            except Exception as e:
                print(f"[ERREUR] {fichier.name} : {e}")

    print(f"\nTerminé : {total_fichiers} fichier(s) traité(s).")
    
if __name__ == "__main__":
    main()
