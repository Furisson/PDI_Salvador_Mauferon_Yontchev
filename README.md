# Projet PDI 22

Ce projet a pour but d'améliorer le visualisateur cartographique initialisé par le PDI 09. Cette application se base sur le produit OpenSource Mviewer.

- [Site officiel mviewer](https://mviewer.github.io/fr/)

Ce projet contient une documentation technique (Rapport d'analyse) ainsi qu'une documentation pratique (Guide utilisateur). Vous pourrez retrouver ces deux pdf en téléchargeant les deux pdf sur votre machine. 

# Installation

**Attention pour pouvoir lancer l'application il vous faut disposer d'une instance de déploiement Apache comme MAMP, l'application se base également sur un geoserver pour accéder à l'ensemble des couches. Pour connaitre les méthodes d'installation rendez-vous sur le** `Guide Utilisateur`.

**Pour pouvoir accéder au projet, il faut procéder en plusieurs étapes :**

- Initialiser git dans votre terminal : 
```
git init
```
- Cloner le projet dans le dossier de votre choix : 
```
git clone + url
```
- Copier ce dossier dans le dossier /var/www/ ( ou autres dossiers de déploiement Apache)
  Vous avez maintenant un visualiseur géographique fonctionnel centré sur le Parc du Golfe du Lion.
- Installer le Geoserver. Une partie du guide utilisateur y est dédiée.
- Installer les bibliothèques python nécessaires pour faire fonctionner le geoserver. Une partie du guide utilisateur y est dédiée.

Pour pouvoir ouvrir l'application, taper **http://localhost/** dans la barre de recherche de votre navigateur.

**Pour une documentation plus poussée sur l'installation, consultez le fichier `guide_installation.pdf`.**

# Fonctionnalités principales

Le projet contient plusieurs fonctionnalités, dont les principales sont :
- Affichage de différentes couches d'information sur le parc du golfe du lion
- Ajout d'une couche au format shapefile de manière permanente
- Liste des projets du parc du golfe du lion avec des informations détaillées sur chacun d'entre eux
- Affichage des données liées aux projets du parc du golfe du lion sous forme de graphiques
- Affichage des informations de chaque couche
- Filtrage des couches et projets
- Ajout d'une couche WMS temporaire à partir d'une URL

# Organisation des fichiers

- `index.html` : Fichier html de base pour le projet, il contient la structure de la page web.
- `app.py` : Fichier python qui contient le code pour faire fonctionner le geoserver.
- `apps/` : Informations essentielles au fonctionnement de l'application,
  - `default.xml` : Fichier de configuration de l'application, il contient les extensions utilisées pour le projet, les couches à afficher, ...
  - `pnmgl/` : Données essentielles du projet
    - `aide_user/` : Dossier d'aide contenant les informations pour ajouter des couches, des extensions, ...
    - `customlayers/` : Couches personnalisées du projet pour les couches ajoutées à la main (ne fonctionne pas à l'heure actuelle)
    - `data/` : Données utilisées pour le projet
      - `geojson/` : Données au format geojson utilisées pour le projet pour les couches ajoutées à la main
      - `projets/` : Données liées aux projets du parc du golfe du lion
    - `img/` : Images utilisées pour le projet
    - `projets/` : Extension pour l'utilisation des projets du parc du golfe du lion
    - `stats/` : Extension pour l'utilisation des statistiques du Mviewer
    - `style/` : Fichiers de style pour les customlayers
    - `templates/` : Templates pour l'affichage d'éléments lors du clic sur un élément de la carte
    - `default_layers.xml` : Fichier de configuration des couches personnalisées du projet
- `css/` : Fichiers css, polices d'écriture et le thème utilisé pour le projet (ici : pnmgl.css)
- `customlayers/` : Couches personnalisées du projet pour les couches ajoutées à la main (fonctionnel)
- `data/` : Données geojson par défaut de Mviewer
- `demo/` : Exemples de fichiers pemettant d'utiliser des extensions de Mviewer
- `docs/` : Fichiers permettant de générer la documentation du projet sur le site officiel de Mviewer
- `img/` : Images utilisées par défaut de Mviewer
- `js/` : Fichiers javascript utilisés par défaut de Mviewer ainsi que les extensions utilisées pour le projet
- `lib/` : Fichiers de librairies utilisées par défaut de Mviewer

# Auteurs

- **Sophie-Amandine SALVADOR** : Cheffe de projet
- **Grégory YONTCHEV** : Chef MOE
- **Killian MAUFERON** : Responsable qualité