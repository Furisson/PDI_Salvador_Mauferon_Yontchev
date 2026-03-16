# Projet PDI 22

Ce projet a pour but d'améliorer le visualisateur cartographique initialisé par le PDI 09. Cette application se base sur le produit OpenSource Mviewer.

- [Site officiel mviewer](https://mviewer.github.io/fr/)

Ce projet contient une documentation technique (Rapport d'analyse) ainsi qu'une documentation pratique (Guide utilisateur). Vous pourrez retrouver ces deux pdf en téléchargeant les deux pdf sur votre machine. 

# Déploiement


**Attention pour pouvoir lancer l'application il vous faut disposer d'une instance de déploiement Apache comme MAMP, l'application se base également sur un geoserver pour accéder à l'ensemble des couches. Pour connaitre les méthodes d'installation rendez-vous sur le** `Guide Utilisateur`.

**Pour pouvoir accéder au projet, il faut procéder en plusieurs étapes :**

- Initialiser git dans votre terminal : git init
- Cloner le projet dans le dossier de votre choix : git clone + url
- Copier ce dossier dans le dossier /var/www/ ( ou autres dossiers de déploiement Apache)
  Vous avez maintenant un visualiseur géographique fonctionnel centré sur le Parc du Golfe du Lion.
- Installer le Geoserver. Une partie du guide utilisateur y est dédiée.

Pour pouvoir ouvrir l'application, taper **http://localhost/** dans la barre de recherche de votre navigateur.

**Pour une documentation plus poussée sur l'installation, consultez le fichier `documentation.pdf`.**

# Organisation des fichiers

**NE PAS MODIFIER LES FICHIERS EN DEHORS DU DOSSIER apps**

Si vous devez modifier un fichier en dehors, mettez-le dans `common`
Les fichiers attenants au projet sont présents dans `apps/pnmgl`

# Authentification Geoserver

username: admin
mdp : geoserver

Espace de travail: pnmgl
