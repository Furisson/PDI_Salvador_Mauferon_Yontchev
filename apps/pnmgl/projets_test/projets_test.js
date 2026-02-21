const URL_DONNEES_PROJETS = "apps/pnmgl/data/projets_test/projects_tests.json";

/**
 * Return une classe glyphicon CSS basé sur le nom de la thématique.
 * @param {string} nom_theme - Le nom du thème a classer
 * @returns {string} - La classe CSS de l'icône à utiliser pour ce thème
 * @example
 * Classe_icone_thematique("Hydrology") // returns "glyphicon glyphicon-tint"
 * Classe_icone_thematique("Urban") // returns "glyphicon glyphicon-home"
 * Classe_icone_thematique("Other") // returns "glyphicon glyphicon-folder-open"
 */

function Classe_icone_thematique(nom_theme) 
{
    const nom = (nom_theme || "").toLowerCase();
    if (nom.includes("hydro")) return "glyphicon glyphicon-tint";
    if (nom.includes("urban")) return "glyphicon glyphicon-home";
    return "glyphicon glyphicon-folder-open";
}

/**
 * Charge les données des projets depuis une URL, et les organise en thèmes avec leurs projets associés.
 * @async
 * @function Charger_theme
 * @returns {Promise<Array<Object>>} une promesse qui résout à un tableau de thèmes, où chaque thème est un objet contenant :
 *   - {string} nom - Le nom du thème, par défaut :  "Sans thématique" si non fourni
 *   - {string|null} icone - L'URL de l'icone du theme ou null si non fourni
 *   - {Array<Object>} projets - Un tableau d'objets de projets, chaque objet contient :
 *     - {string} titre - Le titre du projet, par défaut à "Sans titre" si non fourni
 *     - {string} description - Sa description, par défaut à une chaîne vide si non fournie
 *     - {string} pdf - L'URL du PDF du projet, par défaut à une chaîne vide si non fourni
 * @throws {Error} Si le chargement des données échoue ou si la réponse n'est pas au format attendu
 */

async function Charger_theme() {
    const resp = await fetch(URL_DONNEES_PROJETS, { cache: "no-store" });
    if (!resp.ok) throw new Error("Impossible de charger " + URL_DONNEES_PROJETS);

    const json = await resp.json();
    const themes = json.themes || [];

    return themes.map((t) => 
        ({
            nom: t.nom || "Sans thématique",
            icone: t.icone || null,
            projets: (t.projets || []).map((p) => 
                ({
                titre: p.titre || "Sans titre",
                description: p.description || "",
                pdf: p.pdf || ""
            }))
        }));
}

/**
 * Échappe les caractères spéciaux HTML dans une chaîne pour éviter les problèmes d'affichage et de sécurité.
 * Cette fonction remplace ces caractères par leurs entités HTML correspondantes.
 * 
 * @param {*} str - La chaîne à échapper. Elle sera convertie en chaîne de caractères si ce n'est pas déjà une chaîne.
 * @returns {string} - La chaîne échappée, à insérer dans le HTML.
 * 
 * @example
 * escapeHtml('<div class="test">Hello & goodbye</div>')
 * // Returns: '&lt;div class=&quot;test&quot;&gt;Hello &amp; goodbye&lt;/div&gt;'
 */

function escapeHtml(str) 
{
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/**
 * Ouvre le panneau latéral droit et affiche les informations d'un projet sélectionné.
 *
 * @param {Object} projet - L'objet projet à afficher dans le panneau.
 * @param {string} projet.titre - Le titre du projet.
 * @param {string} [projet.description] - La description du projet (optionnelle).
 * @param {string} [projet.pdf] - L'URL du rapport PDF du projet (optionnelle).
 */

// NOTE : MODIFIER ICI POUR MODIFIER HTML AFFICHÉ LORSQU'ON CLIQUE SUR UN PROJET (ex: ajouter des liens, images, etc.)

function Ouvrir_le_panneau_projet(projet) 
{
    const panneau = document.getElementById("right-panel");
    const content = panneau ? panneau.querySelector(".popup-content") : null;
    if (!panneau || !content) return;

    content.innerHTML = `
        <h4>${escapeHtml(projet.titre)}</h4>
        <p>${escapeHtml(projet.description || "")}</p>
        ${
        projet.pdf
            ? `<a href="${projet.pdf}" target="_blank" class="btn btn-primary">Ouvrir le rapport PDF</a>`
            : ""
        }
    `;

    panneau.classList.add("active");
}

/**
 * Affiche les thèmes et leurs projets associés.
 * Permet d'afficher ou de masquer les projets d'un thème en cliquant sur la ligne du thème.
 * Si un nom de thème est fourni dans `expandedThemeName`, ce thème sera développé par défaut.
 *
 * @param {Array<Object>} themes - Tableau des objets thèmes à afficher. Chaque thème doit avoir les propriétés :
 *   - {string} nom : Le nom du thème.
 *   - {string} [icone] : (Optionnel) Classe CSS de l'icône du thème.
 *   - {Array<Object>} projets : Liste des projets associés au thème, chaque projet doit avoir :
 *       - {string} titre : Le titre du projet.
 * @param {string|null} [expandedThemeName=null] - Nom du thème à développer par défaut (optionnel).
 */

function renderThemes(themes, expandedThemeName = null) 
{
    const container = document.getElementById("themes-list");
    if (!container) return;

    container.innerHTML = "";

    themes.forEach((t, idx) => {
        const id_theme = `mv-theme-${idx}`;

        const ligne = document.createElement("div");
        ligne.className = "mv-theme-row";
        ligne.setAttribute("data-theme-id", id_theme);

        const icone = document.createElement("span");
        icone.className = "mv-theme-icon " + (t.icone ? t.icone : themeIconClass(t.nom));
        ligne.appendChild(icone);

        const nom_span = document.createElement("span");
        nom_span.className = "mv-theme-name";
        nom_span.textContent = t.nom;
        ligne.appendChild(nom_span);

        const projet_wrap = document.createElement("div");
        projet_wrap.className = "mv-projects";
        projet_wrap.id = id_theme;
        t.projects.forEach((p) => 
            {
            const item = document.createElement("div");
            item.className = "mv-project-item";
            item.textContent = p.titre;
            item.addEventListener("click", (e) => 
                {
                    e.stopPropagation(); 
                    openProjectPanel(p);
                });
            projet_wrap.appendChild(item);
        });

        ligne.addEventListener("click", () => {
        const ouvert = projet_wrap.style.display === "block";
        projet_wrap.style.display = ouvert ? "none" : "block";
        });

        if (expandedThemeName && t.nom === expandedThemeName) 
            {
                projet_wrap.style.display = "block";
                chev.className = "mv-theme-chevron glyphicon glyphicon-chevron-up";
            }

        container.appendChild(ligne);
        container.appendChild(projet_wrap);
    });
}

/**
 * Filtre les thèmes et projets selon une query, retourne les thèmes filtrés et 
 * un booléen indique s'il faut tout déplier (car seuls les thèmes matchants restent)
 *
 * @param {Array<Object>} all_theme - Tableau des objets thèmes à afficher. Chaque thème doit avoir les propriétés :
 *   - {string} nom : Le nom du thème.
 *   - {string} [icone] : (Optionnel) Classe CSS de l'icône du thème.
 *   - {Array<Object>} projets : Liste des projets associés au thème, chaque projet doit avoir :
 *       - {string} titre : Le titre du projet.
 * @param {string|null} [query] - requête de recherche pour filtrer les projets (optionnel)
 * @returns {Object} - Un objet contenant :
 *   - {Array<Object>} themes : Les thèmes filtrés, avec uniquement les projets qui matchent la query
 *   - {boolean} expandAllMatches : Indique s'il faut tout déplier (car seuls les thèmes matchants restent)
 */

function Filtrer_Themes(all_theme, query) 
{
    const q = (query || "").toLowerCase().trim();
    if (!q) return { themes: all_theme, expandAllMatches: false };

    const filtered = all_theme
        .map((t) => 
            {
                const projet = t.projets.filter((p) => (p.titre || "").toLowerCase().includes(q));
                return { ...t, projets: projet };
            })
        .filter((t) => t.projets.length > 0);

    return { themes: filtered, expandAllMatches: true };
}

function initSearch(all_themes) 
{
    const input = document.getElementById("projectfilter-field");
    const clear = document.getElementById("projectfilter-clear");
    if (!input) return;

    function apply() 
    {
        const q = input.value;
        if (clear) clear.style.display = q.trim() ? "block" : "none";

        const res = Filtrer_Themes(all_themes, q);

        renderThemes(res.themes);

        // si filtré, on déplie tout (car seuls les thèmes matchants restent)
        if (res.expandAllMatches) 
            {
                document.querySelectorAll("#themes-list + .mv-projects, .mv-projects").forEach((el) => 
                    {
                    });
                document.querySelectorAll("#mv-project-section .mv-projects").forEach((el) => 
                    {
                        el.style.display = "block";
                    });
                document.querySelectorAll("#mv-project-section .mv-theme-chevron").forEach((ch) => 
                    {
                        ch.className = "mv-theme-chevron glyphicon glyphicon-chevron-up";
                    });
        }
    }

    input.addEventListener("input", apply);

    if (clear) 
    {
        clear.addEventListener("click", () => 
            {
                input.value = "";
                apply();
                input.focus();
            });
    }
}

// init (attendre injection HTML composant)

(function initWhenReady() {
    const ok =
        document.getElementById("projectfilter-field") &&
        document.getElementById("themes-list");

    if (!ok) return setTimeout(initWhenReady, 200);

    loadThemes()
        .then((themes) => 
            {
                renderThemes(themes);
                initSearch(themes);
            })
        .catch((e) => 
            {
                console.error(e);
                const container = document.getElementById("themes-list");
                if (container) 
                {
                    container.innerHTML =
                    `<div style="color:#a00;">Erreur chargement projets : ${escapeHtml(e.message)}</div>`;
                }
            });
})();
