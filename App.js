const placesRestantes = a.places - a.inscrits.length;

card.innerHTML = `
  <h3>${a.nom}</h3>
  <p>📅 ${a.date}</p>
  <p>Places restantes : ${placesRestantes}</p>
  <button onclick="inscrire(${index})">S'inscrire</button>
`;

const liste = document.createElement("ul");
a.inscrits.forEach(i => {
  const li = document.createElement("li");
  li.innerText = i.prenom + " (" + i.classe + ")";
  liste.appendChild(li);
});

card.appendChild(liste);
div.appendChild(card);
