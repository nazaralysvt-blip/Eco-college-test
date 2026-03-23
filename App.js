// Actualités
const actus = [
  { titre:"Découverte du rucher", texte:"Apprenez à connaître les abeilles du collège.", theme:"rucher" },
  { titre:"Sortie VAE", texte:"Sensibilisation aux vélos électriques.", theme:"VAE" },
  { titre:"Plantation locale", texte:"Plantation d'espèces endémiques.", theme:"plantation" },
  { titre:"Semaine DD", texte:"Actions écologiques au collège.", theme:"all" }
];

// Action dynamique
let actionEnCours = { nom:"Sortie VAE", date:"10 avril", places:10, inscrits:[] };

function sauvegarder() { localStorage.setItem("actionEnCours", JSON.stringify(actionEnCours)); }
function charger() { const data = localStorage.getItem("actionEnCours"); if(data) actionEnCours = JSON.parse(data); }

// Affichage actualités
function filtrer(theme){
  const div = document.getElementById("contenuActus");
  div.innerHTML="";
  actus.forEach(a=>{
    if(theme==="all"||a.theme===theme){
      const card=document.createElement("div");
      card.className="card";
      card.innerHTML=`<h3>${a.titre}</h3><p>${a.texte}</p>`;
      div.appendChild(card);
    }
  });
}

// Affichage action dynamique
function afficherAction(){
  const div = document.getElementById("contenuActions");
  div.innerHTML="";
  const card = document.createElement("div");
  card.className="card";
  const placesRestantes = actionEnCours.places - actionEnCours.inscrits.length;
  card.innerHTML = `
    <h3>Inscris-toi pour ${actionEnCours.nom}</h3>
    <p>📅 ${actionEnCours.date}</p>
    <p>Places restantes : ${placesRestantes}</p>
    <button onclick="inscrire()">S'inscrire</button>
  `;
  const liste = document.createElement("ul");
  actionEnCours.inscrits.forEach(i=>{
    const li=document.createElement("li");
    li.innerText=`${i.prenom} (${i.classe})`;
    liste.appendChild(li);
  });
  card.appendChild(liste);
  div.appendChild(card);
}

// Fonction inscription
function inscrire(){
  if(actionEnCours.inscrits.length>=actionEnCours.places){ alert("Complet !"); return; }
  const prenom = prompt("Prénom :");
  const classe = prompt("Classe :");
  if(!prenom || !classe) return;
  actionEnCours.inscrits.push({prenom,classe});
  sauvegarder();
  afficherAction();
}

// Navigation entre sections
function afficherSection(sec){
  document.getElementById("actus").style.display=sec==="actus"?"block":"none";
  document.getElementById("actions").style.display=sec==="actions"?"block":"none";
}

// Initialisation
charger();
filtrer("all");       // actualités au démarrage
afficherAction();
