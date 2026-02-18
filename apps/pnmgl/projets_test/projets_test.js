const PROJECTS_URL = "apps/pnmgl/data/projets_test/projects_tests.json";

/**
 * Icônes par défaut ATTENTION A MODIFIER SOPHIE !!!!!
 */
function themeIconClass(themeName) 
{
    const n = (themeName || "").toLowerCase();
    if (n.includes("hydro")) return "glyphicon glyphicon-tint";
    if (n.includes("urban")) return "glyphicon glyphicon-home";
    return "glyphicon glyphicon-folder-open";
}

async function loadThemes() {
    const resp = await fetch(PROJECTS_URL, { cache: "no-store" });
    if (!resp.ok) throw new Error("Impossible de charger " + PROJECTS_URL);

    const json = await resp.json();
    const themes = json.themes || [];

    return themes.map((t) => 
        ({
            name: t.name || "Sans thématique",
            icon: t.icon || null,
            projects: (t.projects || []).map((p) => 
                ({
                title: p.title || "Sans titre",
                description: p.description || "",
                pdf: p.pdf || ""
            }))
        }));
}

function escapeHtml(str) 
{
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function openProjectPanel(project) 
{
    const panel = document.getElementById("right-panel");
    const content = panel ? panel.querySelector(".popup-content") : null;
    if (!panel || !content) return;

    content.innerHTML = `
        <h4>${escapeHtml(project.title)}</h4>
        <p>${escapeHtml(project.description || "")}</p>
        ${
        project.pdf
            ? `<a href="${project.pdf}" target="_blank" class="btn btn-primary">Ouvrir le rapport PDF</a>`
            : ""
        }
    `;

    panel.classList.add("active");
}

/**
 * Render : affiche les thèmes et leurs projets
 */

function renderThemes(themes, expandedThemeName = null) 
{
    const container = document.getElementById("themes-list");
    if (!container) return;

    container.innerHTML = "";

    themes.forEach((t, idx) => {
        const themeId = `mv-theme-${idx}`;

        const ligne = document.createElement("div");
        ligne.className = "mv-theme-row";
        ligne.setAttribute("data-theme-id", themeId);

        const iconSpan = document.createElement("span");
        iconSpan.className = "mv-theme-icon " + (t.icon ? t.icon : themeIconClass(t.name));
        ligne.appendChild(iconSpan);

        const nameSpan = document.createElement("span");
        nameSpan.className = "mv-theme-name";
        nameSpan.textContent = t.name;
        ligne.appendChild(nameSpan);

        const projWrap = document.createElement("div");
        projWrap.className = "mv-projects";
        projWrap.id = themeId;

        t.projects.forEach((p) => 
            {
            const item = document.createElement("div");
            item.className = "mv-project-item";
            item.textContent = p.title;
            item.addEventListener("click", (e) => 
                {
                    e.stopPropagation(); 
                    openProjectPanel(p);
                });
            projWrap.appendChild(item);
        });

        ligne.addEventListener("click", () => {
        const isOpen = projWrap.style.display === "block";
        projWrap.style.display = isOpen ? "none" : "block";
        });

        if (expandedThemeName && t.name === expandedThemeName) 
            {
                projWrap.style.display = "block";
                chev.className = "mv-theme-chevron glyphicon glyphicon-chevron-up";
            }

        container.appendChild(ligne);
        container.appendChild(projWrap);
    });
}

/**
 * Filtre les thèmes et projets selon une query, retourne les thèmes filtrés et 
 * un booléen indiquant s'il faut tout déplier (car seuls les thèmes matchants restent)
 */

function filterThemes(allThemes, query) 
{
    const q = (query || "").toLowerCase().trim();
    if (!q) return { themes: allThemes, expandAllMatches: false };

    const filtered = allThemes
        .map((t) => 
            {
                const projects = t.projects.filter((p) => (p.title || "").toLowerCase().includes(q));
                return { ...t, projects };
            })
        .filter((t) => t.projects.length > 0);

    return { themes: filtered, expandAllMatches: true };
}

function initSearch(allThemes) 
{
    const input = document.getElementById("projectfilter-field");
    const clear = document.getElementById("projectfilter-clear");
    if (!input) return;

    function apply() 
    {
        const q = input.value;
        if (clear) clear.style.display = q.trim() ? "block" : "none";

        const res = filterThemes(allThemes, q);

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
