// Stockage et initialisation
let actus = JSON.parse(localStorage.getItem("actus")) || [
  { titre:"Découverte du rucher", texte:"Apprenez à connaître les abeilles.", theme:"rucher" },
  { titre:"Sortie VAE", texte:"Sensibilisation aux vélos électriques.", theme:"VAE" },
  { titre:"Plantation locale", texte:"Plantation d'espèces endémiques.", theme:"plantation" }
];

let actions = JSON.parse(localStorage.getItem("actions")) || [
  { nom:"Sortie VAE", date:"2026-04-10", places:10, theme:"VAE", inscrits:[] }
];

// Sauvegarde locale
function sauvegarder() {
  localStorage.setItem("actus", JSON.stringify(actus));
  localStorage.setItem("actions", JSON.stringify(actions));
}

// Navigation entre sections
function afficherSection(sec){
  document.getElementById("actus").style.display=sec==="actus"?"block":"none";
  document.getElementById("actions").style.display=sec==="actions"?"block":"none";
}

// Actualités
function filtrerActualites(theme){
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

// Ajouter un article
function ajouterArticle(){
  const titre = document.getElementById("titreActu").value.trim();
  const texte = document.getElementById("texteActu").value.trim();
  const theme = document.getElementById("themeActu").value;
  if(!titre||!texte) return alert("Remplir titre et texte");
  actus.unshift({titre, texte, theme});
  sauvegarder();
  filtrerActualites("all");
  document.getElementById("formActu").reset();
}

// Actions
function filtrerActions(theme){
  const div = document.getElementById("contenuActions");
  div.innerHTML="";
  actions.forEach((a,index)=>{
    if(theme==="all"||a.theme===theme){
      const card=document.createElement("div");
      card.className="card";
      const placesRestantes = a.places - a.inscrits.length;
      card.innerHTML=`<h3>Inscris-toi pour ${a.nom}</h3>
        <p>📅 ${a.date}</p>
        <p>Places restantes : ${placesRestantes}</p>
        <button onclick="inscrireAction(${index})">S'inscrire</button>`;
      const liste=document.createElement("ul");
      a.inscrits.forEach(i=>{
        const li=document.createElement("li");
        li.innerText=`${i.prenom} (${i.classe})`;
        liste.appendChild(li);
      });
      card.appendChild(liste);
      div.appendChild(card);
    }
  });
}

// Ajouter action
function ajouterAction(){
  const nom = document.getElementById("nomAction").value.trim();
  const date = document.getElementById("dateAction").value;
  const places = parseInt(document.getElementById("placesAction").value);
  const theme = document.getElementById("themeAction").value;
  if(!nom||!date||isNaN(places)) return alert("Remplir tous les champs");
  actions.unshift({nom,date,places,theme,inscrits:[]});
  sauvegarder();
  filtrerActions("all");
  document.getElementById("formAction").reset();
}

// Inscription élève
function inscrireAction(index){
  const action = actions[index];
  if(action.inscrits.length>=action.places){ alert("Complet !"); return; }
  const prenom = prompt("Prénom :");
  const classe = prompt("Classe :");
  if(!prenom||!classe) return;
  action.inscrits.push({prenom,classe});
  sauvegarder();
  filtrerActions("all");
}

// Initialisation
filtrerActualites("all");
filtrerActions("all");
