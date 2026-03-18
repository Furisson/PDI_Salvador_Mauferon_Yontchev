const URL_DONNEES_PROJETS = "apps/pnmgl/data/projets/projects.json";

let indexCouchesGlobal = {};
let indexProjets = {};

/**
 * Retourne une classe CSS (font awesome) en fonction du nom de la thématique.
 * Sert uniquement si aucune icône n'est fournie dans le JSON.
 */
function classeIconeParDefaut(nomThematique)
{
    const nom = (nomThematique || "").toLowerCase();
    if (nom.includes("hydro")) return "glyphicon glyphicon-tint";
    if (nom.includes("urban")) return "glyphicon glyphicon-home";
   
    return "glyphicon glyphicon-folder-open";
}


/**
 * Échappe les caractères spéciaux HTML pour éviter les problèmes d'affichage et de sécurité.
 */
function echapperHtml(texte)
{
    return String(texte)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/**
 * Permet de normaliser les noms des couches (sécurité), sous la forme theme_couche
 */
function normaliserIdCouche(texte) {
    return (texte || "")
        .toLowerCase()
        .replace(/\s+/g, "_");
}

function ajouterCoucheDansIndex(projet, couche) {
    if (!projet || !couche?.name) return;

    if (!indexCouchesGlobal[projet]) {
        indexCouchesGlobal[projet] = [];
    }

    indexCouchesGlobal[projet].push(couche);
}




/**
 * Charge le fichier layers.json et construit un index permettant
 * d’associer un projet à ses couches associées.
 *
 * Structure obtenue :
 *
 * indexCouchesParProjet = {
 *   "Nom du projet": [couche1, couche2, ...]
 * }
 *
 * Cet index est ensuite utilisé pour activer, ouvrir, afficher, automatiquement
 * les couches liées à un projet dans l’interface.
 */
async function chargerCouchesParProjet() {
    const reponse = await fetch("../../../layer.json", { cache: "no-store" });
    if (!reponse.ok) throw new Error("Erreur layer.json");

    const couches = await reponse.json();

    couches.forEach((couche) => {
        if (!couche.projet) return;

        ajouterCoucheDansIndex(couche.projet, {
            name: couche.name,
            source: "layer.json"
        });
    });
}

async function chargerCouchesParProjetSimple() {
    const reponse = await fetch("../../../layers.json", { cache: "no-store" });
    if (!reponse.ok) throw new Error("Erreur layers.json");

    const couches = await reponse.json();

    couches.forEach((couche) => {
        if (!couche.projet) return;

        ajouterCoucheDansIndex(couche.projet, {
            name: couche.name,
            theme: couche.theme,
            source: "layers.json"
        });
    });
}



/**
 * Cette fonction permet de charger les thématiques et les projets depuis le fichier JSON,
 * les normalise pour les adapter à l’interface.
 *
 * Cette fonction construit aussi un index global des projets
 * (`indexProjets`) permettant de retrouver un projet
 * à partir de son titre.
 *
 * @returns {Promise<Array>} Tableau de thématiques contenant leurs projets
 */
async function chargerThematiques()
{
    const reponse = await fetch(URL_DONNEES_PROJETS, { cache: "no-store" });
    if (!reponse.ok)
    {
        throw new Error("Impossible de charger " + URL_DONNEES_PROJETS);
    }

    const donnees = await reponse.json();
    const thematiques = donnees.thematiques || [];

    thematiques.forEach(theme => {
        (theme.projets || []).forEach(p => {
            indexProjets[p.titre] = p;
        });
    });

    return thematiques.map((t) => (
    {
        nom: t.nom || "Sans thématique",
        icone: t.icone || null,
        projets: (t.projets || []).map((p) => (
        {
            titre: p.titre || "Sans titre",
            contenu: Array.isArray(p.contenu) ? p.contenu : [],
            image : p.image || "",
            desc_img :p.desc_img || "",
            pdf: p.pdf || ""
        }))
    }));
}

/**
 * Génère le HTML correspondant à un bloc de contenu de projet.
 *
 * Chaque bloc possède un type (`titre`, `paragraphe`, `liste`, `lien`, etc.)
 * qui détermine le HTML généré.
 *
 * Elle permet de décrire le contenu des projets détaillé dans le JSON
 * de manière structurée sans écrire du HTML en brut.
 *
 * @param {Object} bloc - Objet décrivant un bloc de contenu
 * @param {string} bloc.type - Type de bloc (titre, paragraphe, liste...)
 * @returns {string} HTML correspondant au bloc
 */

function rendreBlocContenu(bloc)
{
    if (!bloc || !bloc.type) return "";
    switch (bloc.type)
    {
        case "titre":
            return `<h4 class="panneau-projet__sous-titre">${echapperHtml(bloc.texte || "")}</h4>`;

        case "paragraphe":
            return `<p class="panneau-projet__description">${echapperHtml(bloc.texte || "")}</p>`;

        case "liste":
            return `
                <ul class="panneau-projet__liste">
                    ${(bloc.items || [])
                        .map(item => `<li>${echapperHtml(item)}</li>`)
                        .join("")}
                </ul>`;

        case "lien":
            return bloc.url
                ? `<p class="panneau-projet__lien">
                        <a href="${bloc.url}" target="_blank" rel="noopener noreferrer">
                            ${echapperHtml(bloc.texte || bloc.url)}
                        </a>
                   </p>`
                : "";

        default:
            return "";
    }
}

/**
 * Transforme le contenu structuré d’un projet en JSON
 * en une chaîne HTML qui pourra être injectée dans le panneau projet.
 *
 * Le contenu d’un projet est défini comme suit :
 * [
 *   { type: "titre", texte: "..." },
 *   { type: "paragraphe", texte: "..." },
 *   { type: "liste", items: [...] }
 * ]
 *
 * Chaque bloc est converti en HTML via la fonction `rendreBlocContenu`.
 *
 * @param {Array} contenu - Tableau de blocs décrivant le contenu du projet
 * @returns {string} HTML généré à partir des blocs
 */

function rendreContenuProjet(contenu)
{
    if (!Array.isArray(contenu)) return "";
    return contenu.map(rendreBlocContenu).join("");
}

/**
 * Ouvre le panneau latéral droit et affiche la fiche détaillée d’un projet.
 *
 * Cette fonction :
 * - injecte le contenu HTML du projet dans le panneau
 * - affiche éventuellement une image et des actions (PDF, couches associées)
 * - active l’ouverture du panneau droit dans l’interface Mviewer
 *
 * @param {Object} projet - Objet projet issu du JSON
 */

function ouvrirPanneauProjet(projet)
{
    const panneau = document.getElementById("right-panel");
    const contenu = panneau ? panneau.querySelector(".popup-content") : null;
    if (!panneau || !contenu) return;

    contenu.innerHTML = `
        <div class="panneau-projet">
            <div class="panneau-projet__interieur">

                <div class="panneau-projet__entete">
                    <h3 class="panneau-projet__titre">${echapperHtml(projet.titre)}</h3>
                </div>

                <div class="panneau-projet__corps">
                    ${projet.image ? `<img class="panneau-projet__image" src="${projet.image}" alt="${echapperHtml(projet.desc_img || '')}">` : ""}
                    ${rendreContenuProjet(projet.contenu)}

                    <div class="panneau-projet__actions">
                        ${indexCouchesGlobal[projet.titre] ? `<button class="btn btn-primary panneau-projet__bouton" onclick="afficherCouchesDuProjet('${echapperHtml(projet.titre)}')"> Afficher les couches associées </button>` : ""}    
                        ${projet.pdf ? `<a href="${projet.pdf}" target="_blank" class="btn btn-primary panneau-projet__bouton">Ouvrir le rapport</a>` : ""}
                       
                    </div>

            </div>
        </div> `;

    panneau.classList.add("active");
}

/**
 * Catch le wrapper correspondant à son état fermé
 */

function wrapperEstFerme() {
    const wrapper = document.getElementById("wrapper");
    if (!wrapper) return false;

    return wrapper.classList.contains("toggled-2");
}

/**
 * Ouvre le wrapper contenant les projets au clic sur une thématique
 */

function ouvrirWrapperSiFerme(callback) {
    const boutonMenu = document.querySelector(".menu-toggle");
    const wrapper = document.getElementById("wrapper");

    if (!wrapper || !boutonMenu) {
        if (callback) callback();
        return;
    }

    if (!wrapperEstFerme()) {
        if (callback) callback();
        return;
    }

    boutonMenu.click();

    setTimeout(() => {
        if (callback) callback();
    }, 250);
}

/**
 * Ouvre automatiquement dans le menu des couches le thème et le groupe
 * auxquels appartient une couche donnée.
 *
 * Cette fonction est utilisée lorsqu’on clique sur afficher les couches associées à un projet.
 * Elle permet de dérouler l’arborescence du menu pour rendre la couche visible
 * dans l’interface avant de l’activer.
 *
 * Fonctionnement :
 * - remonte dans le DOM à partir de l’élément de couche
 * - ouvre le groupe (niveau level-2)
 * - ouvre le thème (niveau level-1)
 * - force l'affichage des sous-listes si elles sont repliées
 *
 * @param {HTMLElement} liCouche - Élément DOM correspondant à la couche dans le menu
 */
function ouvrirThemeEtGroupeDepuisCouche(liCouche) {
    if (!liCouche) return;

    const ulGroupe = liCouche.parentElement;
    if (ulGroupe && ulGroupe.tagName === "UL") {
        ulGroupe.style.display = "block";
    }

    const liGroupe = liCouche.closest("li.level-2");
    if (liGroupe) {
        const aGroupe = liGroupe.querySelector(":scope > a");
        const ulSousGroupe = liGroupe.querySelector(":scope > ul");

        if (ulSousGroupe) {
            ulSousGroupe.style.display = "block";
        }

        if (aGroupe) {
            liGroupe.classList.add("open");
        }
    }

    const liTheme = liCouche.closest("li.level-1");
    if (liTheme) {
        const aTheme = liTheme.querySelector(":scope > a");
        const ulTheme = liTheme.querySelector(":scope > ul");

        if (ulTheme) {
            ulTheme.style.display = "block";
        }

        if (aTheme) {
            liTheme.classList.add( "open");
        }
    }
}

/**
 * Génère et affiche la liste des thématiques et de leurs projets
 * dans le panneau latéral gauche de l'interface.
 *
 * Pour chaque thématique :
 * - crée une ligne contenant une icône et le nom de la thématique
 * - crée un conteneur repliable contenant la liste des projets
 * - permet d’ouvrir ou fermer la liste des projets au clic
 *
 * Les projets sont affichés sous forme d’éléments cliquables.
 * Lorsqu’un projet est sélectionné, la fonction `ouvrirPanneauProjet`
 * est appelée afin d’afficher la fiche détaillée dans le panneau droit.
 *
 * La fonction gère également :
 * - l’animation d’ouverture et de fermeture des projets
 * - la fermeture automatique des autres thématiques ouvertes
 * - l’ouverture automatique du menu si le panneau gauche est replié
 *
 * @param {Array} thematiques - Tableau des thématiques contenant leurs projets
 */

function afficherThematiques(thematiques)
{
    const conteneur = document.getElementById("themes-list");
    if (!conteneur) return;

    conteneur.innerHTML = "";

    thematiques.forEach((t, index) =>
    {
        const idBlocProjets = `bloc-projets-${index}`;

        // Ligne thématique
        const ligne = document.createElement("div");
        ligne.className = "mv-theme-row";
        ligne.setAttribute("data-thematique-id", idBlocProjets);

        // Icône
        const icone = document.createElement("span");
        icone.className = "mv-theme-icon " + (t.icone ? t.icone : classeIconeParDefaut(t.nom));
        ligne.appendChild(icone);

        // Nom
        const nomSpan = document.createElement("span");
        nomSpan.className = "mv-theme-name";
        nomSpan.textContent = t.nom;
        ligne.appendChild(nomSpan);

        // Conteneur projets
        const blocProjets = document.createElement("div");
        blocProjets.className = "mv-projects";
        blocProjets.id = idBlocProjets;

        (t.projets || []).forEach((p,indexProjet) =>
        {
            const item = document.createElement("li");
            item.className = "mv-project-item";
            item.textContent = p.titre;
            item.indexProjet = indexProjet;

            item.addEventListener("click", (e) =>
            {
                e.stopPropagation(); // Ne pas replier thématique
                ouvrirPanneauProjet(p);
            });

            blocProjets.appendChild(item);
        });

        ligne.addEventListener("click", () =>
        {
            // Si le wrapper est fermé, on l’ouvre puis on ouvre directement cette thématique
            if (wrapperEstFerme())
            {
                ouvrirWrapperSiFerme(() =>
                {
                    document.querySelectorAll("#mv-project-section .mv-projects.ouvert").forEach((autre) =>
                    {
                        if (autre !== blocProjets)
                        {
                            appliquerDelaisFermeture(autre);
                            autre.classList.remove("ouvert");
                        }
                    });

                    appliquerDelaisOuverture(blocProjets);
                    blocProjets.classList.add("ouvert");
                });

                return;
            }

            const etaitOuvert = blocProjets.classList.contains("ouvert");

            document.querySelectorAll("#mv-project-section .mv-projects.ouvert").forEach((autre) =>
            {
                if (autre !== blocProjets)
                    {
                    appliquerDelaisFermeture(autre);
                    autre.classList.remove("ouvert");
                    }
            });

                if (etaitOuvert)
                {
                    appliquerDelaisFermeture(blocProjets);
                    blocProjets.classList.remove("ouvert");
                }
                else
                {
                    appliquerDelaisOuverture(blocProjets);
                    blocProjets.classList.add("ouvert");
                }
        });

        function appliquerDelaisOuverture(conteneur)
        {
            const items = conteneur.querySelectorAll(".mv-project-item");
            items.forEach((it, i) =>
            {
                it.style.transitionDelay = (i * 60) + "ms";
            });
        }

        function appliquerDelaisFermeture(conteneur)
        {
            const items = [...conteneur.querySelectorAll(".mv-project-item")];
            const n = items.length;
            items.forEach((it, i) =>
            {
                // inversé : dernier disparaît en premier : effet défilement
                it.style.transitionDelay = ((n - 1 - i) * 60) + "ms";
            });
        }

        conteneur.appendChild(ligne);
        conteneur.appendChild(blocProjets);
    });
}

/**
 * Filtre les projets sur leur titre.
 * Retourne uniquement les thématiques qui ont au moins un projet matchant la requete.
 */

function filtrerThematiques(thematiques, requete)
{
    const q = (requete || "").toLowerCase().trim();
    if (!q) return { thematiques, toutDeplier: false };

    const thematiquesFiltrees = thematiques.map((t) =>
        {
            const projetsFiltres = (t.projets || []).filter((p) =>
                (p.titre || "").toLowerCase().includes(q)
            );
            return { ...t, projets: projetsFiltres };
        })
        .filter((t) => t.projets.length > 0);

    return { thematiques: thematiquesFiltrees, toutDeplier: true };
}

/**
 * Branche la barre de recherche pour filtrer les projets.
 */

function initialiserRecherche(thematiques)
{
    const champ = document.getElementById("projectfilter-field");
    const boutonEffacer = document.getElementById("projectfilter-clear");
    if (!champ) return;

    function appliquer()
    {
        const texte = champ.value;
        if (boutonEffacer) boutonEffacer.style.display = texte.trim() ? "block" : "none";

        const resultat = filtrerThematiques(thematiques, texte);
        afficherThematiques(resultat.thematiques);

        // Si filtré : on déplie tout pour montrer les résultats
        if (resultat.toutDeplier)
            {
                document.querySelectorAll("#mv-project-section .mv-projects").forEach((el) =>
                    {
                        el.classList.add("ouvert");
                    });
            }
    }

    champ.addEventListener("input", appliquer);

    if (boutonEffacer)
    {
        boutonEffacer.addEventListener("click", () =>
        {
            champ.value = "";
            appliquer();
            champ.focus();
        });
    }
}

/**
 * Permet de refermer toutes les thématiques si celles-ci étaient ouvertes : utile si clique sur une autre thématique
 */

function refermerToutesLesThematiques()
{
    document
        .querySelectorAll("#mv-project-section .mv-projects.ouvert")
        .forEach((element) =>
        {
            element.classList.remove("ouvert");
        });
}

/**
 * Ferme toutes les thématiques
 */

function initialiserFermetureMenuProjets()
{
    const boutonMenu = document.querySelector(".menu-toggle");
    const wrapper = document.getElementById("wrapper");

    if (!boutonMenu || !wrapper) return;

    boutonMenu.addEventListener("click", () =>
    {
        setTimeout(() =>
        {
            if (wrapper.classList.contains("toggled-2"))
                {
                    refermerToutesLesThematiques();
                }
        }, 50);
    });
}

/**
 * Init : attend que le composant soit injecté dans le DOM, puis charge et affiche les données.
 */

(function initialiserQuandPret()
{
    const pret =
        document.getElementById("projectfilter-field") &&
        document.getElementById("themes-list");

    if (!pret) return setTimeout(initialiserQuandPret, 200);
    chargerCouchesParProjet(),
    chargerCouchesParProjetSimple(),
    chargerThematiques()

        .then((thematiques) =>
        {
            afficherThematiques(thematiques);
            initialiserRecherche(thematiques);
            initialiserFermetureMenuProjets();
        })
        .catch((erreur) =>
        {
            console.error(erreur);
            const conteneur = document.getElementById("themes-list");
            if (conteneur)
            {
                conteneur.innerHTML =
                `<div style="color:#a00;">Erreur chargement projets : ${echapperHtml(erreur.message)}</div>`;
            }
        });
})();

/**
 * Gère les liens entre les différentes fenêtres notamment entre les projets et les couches popur afficher un projet depuis une couche et des données depuis un projet.
 */

window.getRapportUrl = function(nomProjet){

    if(indexProjets[nomProjet]){
        return indexProjets[nomProjet].pdf;
    }
    return null;
}

window.ouvrirProjetDepuisNom = function(nomProjet) {
    if (indexProjets[nomProjet]) {
        ouvrirPanneauProjet(indexProjets[nomProjet]);
    }
}

/**
 * Affiche sur la carte toutes les couches associées à un projet.
 *
 * La fonction :
 * - retrouve les couches liées au projet via l’index
 * - ouvre automatiquement le menu des couches si fermé
 * - active la couche dans Mviewer
 *
 * @param {string} nomProjet - Nom du projet
 */

window.afficherCouchesDuProjet = function(nomProjet) {
    const couches = indexCouchesGlobal[nomProjet];

    if (!couches || couches.length === 0) {
        console.warn("Aucune couche trouvée pour :", nomProjet);
        return;
    }

    ouvrirWrapperSiFerme(() => {
        couches.forEach((couche) => {

            var liCouche = document.querySelector(
                `[data-layerid="${couche.name}"]`
            );

            if (!liCouche) {
                console.log(couche)
                liCouche = document.querySelector(
                    `[data-layerid="${normaliserIdCouche(couche.theme)+"_"+normaliserIdCouche(couche.name)}"]`)
            };

            if(!liCouche){
                console.warn("Couche introuvable :", couche.name);
                return;
            }

            // ouvre menu
            ouvrirThemeEtGroupeDepuisCouche(liCouche);

            // checkbox
            const checkbox = liCouche.querySelector('input[type="checkbox"]');

            if (!checkbox) return;

            if (checkbox.value !== "true") {
                mviewer.toggleLayer(liCouche);
            }
        });
    });
};