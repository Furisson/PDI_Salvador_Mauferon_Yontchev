const PROJECTS_URL = "apps/pnmgl/data/projets_test/projects_tests.json";

async function loadProjects() {
  const resp = await fetch(PROJECTS_URL, { cache: "no-store" });
  if (!resp.ok) throw new Error("Impossible de charger " + PROJECTS_URL);

  const json = await resp.json();

  // Ton format :
  // { "themes": [ { "name": "...", "projects": [ {title,description,pdf} ] } ] }
  return (json.themes || []).map((t) => ({
    theme: t.name || "Sans thème",
    items: (t.projects || []).map((p) => ({
      title: p.title || "Sans titre",
      description: p.description || "",
      pdf: p.pdf || ""
    }))
  }));
}

function renderProjects(data) {
  const container = document.getElementById("project-list");
  if (!container) return;

  container.innerHTML = "";

  data.forEach((theme) => {
    if (!theme.items || theme.items.length === 0) return;

    const title = document.createElement("div");
    title.className = "project-theme-title";
    title.textContent = theme.theme;
    container.appendChild(title);

    theme.items.forEach((p) => {
      const item = document.createElement("div");
      item.className = "list-group-item";
      item.textContent = p.title;
      item.addEventListener("click", () => openProjectPanel(p));
      container.appendChild(item);
    });
  });
}

function openProjectPanel(project) {
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

function initSearch(allProjects) {
  const input = document.getElementById("projectfilter-field");
  const clear = document.getElementById("projectfilter-clear");

  if (!input) return;

  function applyFilter() {
    const q = input.value.toLowerCase().trim();

    if (clear) clear.style.display = q ? "block" : "none";

    const filtered = allProjects.map((t) => ({
      theme: t.theme,
      items: (t.items || []).filter((p) =>
        (p.title || "").toLowerCase().includes(q)
      )
    }));

    renderProjects(filtered);
  }

  input.addEventListener("input", applyFilter);

  if (clear) {
    clear.addEventListener("click", () => {
      input.value = "";
      applyFilter();
      input.focus();
    });
  }

  applyFilter();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// init (attendre que le composant HTML soit injecté)
(function initWhenReady() {
  const ok =
    document.getElementById("projectfilter-field") &&
    document.getElementById("project-list");

  if (!ok) return setTimeout(initWhenReady, 200);

  loadProjects()
    .then((projects) => {
      renderProjects(projects);
      initSearch(projects);
    })
    .catch((e) => {
      console.error(e);
      const container = document.getElementById("project-list");
      if (container) {
        container.innerHTML =
          `<div style="color:#a00;">Erreur chargement projets : ${escapeHtml(e.message)}</div>`;
      }
    });
})();
