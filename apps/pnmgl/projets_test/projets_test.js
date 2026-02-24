const URL_DONNEES_PROJETS = "apps/pnmgl/data/projets_test/projects_tests.json";

/**
 * Retourne une classe CSS (glyphicon) en fonction du nom de la thématique.
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
 * Charge les données JSON et retourne une structure normalisée :
 * [
 *   { nom, icone, projets: [{ titre, description, pdf }, ...] },
 *   ...
 * ]
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

    return thematiques.map((t) => (
    {
        nom: t.nom || "Sans thématique",
        icone: t.icone || null,
        projets: (t.projets || []).map((p) => (
        {
            titre: p.titre || "Sans titre",
            description: p.description || "",
            pdf: p.pdf || ""
        }))
    }));
}

/**
 * Ouvre le panneau latéral droit et affiche les informations d'un projet.
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
                    ${projet.description ? `<p class="panneau-projet__description">${echapperHtml(projet.description)}</p>` : ""}

                    <div class="panneau-projet__actions">
                    ${projet.pdf ? `<a href="${projet.pdf}" target="_blank" class="btn btn-primary panneau-projet__bouton">Ouvrir le rapport</a>` : ""}
                    </div>
                </div>

            </div>
        </div> `;

    panneau.classList.add("active");
}

/**
 * Affiche les thématiques et leurs projets (dépliables au clic).
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

        // Conteneur projets (repliable)
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
                e.stopPropagation(); // évite de replier la thématique
                ouvrirPanneauProjet(p);
            });

            blocProjets.appendChild(item);
        });

        ligne.addEventListener("click", () => 
            {
                const etaitOuvert = blocProjets.classList.contains("ouvert");

                // ferme les autres (accordéon)
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
            // fermeture : délais inversés
            appliquerDelaisFermeture(blocProjets);
            blocProjets.classList.remove("ouvert");
        } 
        else 
        {
            // ouverture : délais normaux
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
                // inversé : dernier disparaît en premier
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
        if (resultat.toutDeplier) {
        document.querySelectorAll("#mv-project-section .mv-projects").forEach((el) => {
            el.classList.add("ouvert");
        });
        }
    }

    champ.addEventListener("input", appliquer);

    if (boutonEffacer) 
    {
        boutonEffacer.addEventListener("click", () => {
        champ.value = "";
        appliquer();
        champ.focus();
        });
    }
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

    chargerThematiques()
        .then((thematiques) => 
        {
            afficherThematiques(thematiques);
            initialiserRecherche(thematiques);
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