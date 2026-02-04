# Projet PDI 09

L'application produite par l'équipe du PDI 09 est un visualisateur cartographique basé sur l'application OpenSource Mviewer. 

- [Site officiel mviewer](https://mviewer.github.io/fr/)

Une documentation (utilisateur et technique) est disponible au format pdf dans le fichier `documentation.pdf` (téléchargez le pdf sur votre machine pour pouvoir utiliser les liens du pdf).

Un grand merci à Vincet De Oliveira et Maylis De La Serve pour leurs conseils techniques, à Thierry Saffroy et Delphine Genes pour leur aide dans la gestion de projet, à Alizée Martin, Olga Bolzinger et Grégory Agin pour avoir porté ce projet du côté du PNMGL et enfin à Amyeric Dutremble pour son rapport de stage du cycle géomètre-géomaticien réalisé pour Altermap et nommé "les enjeux de la cartographie", qui nous a permis de nous faire découvrir mviewer et de nous donner une idée des possibilités qu'offrent cet outil.


## Déploiement

**Le projet nécessite une instance de déploiement Apache (vous pouvez utiliser MAMP par exemple). Il faut disposer d'un geoserver pour faire fonctionner certaines couches de l'application.** Pour une installation basique, le déploiement se passe en trois étapes :

- Cloner le projet dans le dossier de votre choix
- Copier ce dossier dans le dossier /var/www/ ( ou autres dossiers de déploiement Apache)
  Vous avez maintenant un visualiseur géographique fonctionnel centré sur le Parc du Golfe du Lion.
- Installer le Geoserver. Une partie de la documentaion utilisateur y est dédiée.
- Si vous souhaitez publier vos propres couches/thèmes, modifiez le fichier `apps/default.xml`, en suivant la documentation technique fournie avec le projet

Pour pouvoir afficher la carte du PNMGL, utiliser **http://localhost/**.

**Pour une documentation plus poussée sur l'installation, consultez le fichier `documentation.pdf`.**

# Organisation des fichiers

**NE PAS MODIFIER LES FICHIERS EN DEHORS DU DOSSIER apps**
Si vous devez modifier un fichier en dehors, mettez-le dans `common`

Les fichiers attenants au projet sont présents dans `apps/pnmgl`

Le fichier pour ajouter/enlever des couches est `apps/default.xml`

## Fichier apps/default.xml

Le fichier de configuration permet la personnalisation des thèmes/couches du visualiseur ; une configuration par
défaut est fournie dans `apps/default.xml`, vous pouvez le dupliquer et l'adapter à vos besoins en vous aidant de la [documentation.](http://mviewerdoc.readthedocs.io/fr/latest/)

Des exemples de code pour pouvoir modifier l'application sont disponibles dans le dossier `apps\pnmgl\aide_user`.

# Authentification Geoserver

username: admin
mdp : geoserver

Espace de travail: pnmgl
