// Actualités
const actus = [
  { titre: "Introduction rucher", texte: "Découverte des abeilles", theme: "rucher" },
  { titre: "Sortie VAE", texte: "Découverte des vélos électriques", theme: "VAE" },
  { titre: "Plantation locale", texte: "Plantation d'espèces endémiques", theme: "plantation" },
  { titre: "Semaine DD", texte: "Actions écologiques au collège", theme: "all" }
];

// Actions dynamiques
let actionEnCours = { nom: "Sortie VAE", date: "10 avril", places: 10, inscrits: [] };

function sauvegarder() {
  localStorage.setItem("actions", JSON.stringify(actionEnCours));
}

function charger() {
  const data = localStorage.getItem("actions");
  if (data) {
    actionEnCours = JSON.parse(data);
  }
}

// Afficher actualités selon filtre
function filtrer(theme) {
  const div = document.getElementById("actus");
  div.innerHTML = "";
  actus.forEach(a => {
    if (theme === "all" || a.theme === theme) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${a.titre}</h3><p>${a.texte}</p>`;
      div.appendChild(card);
    }
  });
}

// Afficher action dynamique
function afficherAction() {
  const div = document.getElementById("actions");
  div.innerHTML = "";
  const card = document.createElement("div");
  card.className = "card";

  const placesRestantes = actionEnCours.places - actionEnCours.inscrits.length;

  card.innerHTML = `
    <h3>Inscris-toi pour ${actionEnCours.nom}</h3>
    <p>📅 ${actionEnCours.date}</p>
    <p>Places restantes : ${placesRestantes}</p>
    <button onclick="inscrire()">S'inscrire</button>
  `;

  const liste = document.createElement("ul");
  actionEnCours.inscrits.forEach(i => {
    const li = document.createElement("li");
    li.innerText = `${i.prenom} (${i.classe})`;
    liste.appendChild(li);
  });

  card.appendChild(liste);
  div.appendChild(card);
}

// Fonction inscription
function inscrire() {
  if (actionEnCours.inscrits.length >= actionEnCours.places) {
    alert("Complet !");
    return;
  }
  const prenom = prompt("Prénom :");
  const classe = prompt("Classe :");
  if (!prenom || !classe) return;
  actionEnCours.inscrits.push({ prenom, classe });
  sauvegarder();
  afficherAction();
}

// Initialisation
charger();
filtrer("all"); // affiche les actualités dès le démarrage
afficherAction();
