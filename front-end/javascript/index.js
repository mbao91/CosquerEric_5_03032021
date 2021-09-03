//Lien vers l'API
fetch("http://localhost:3000/api/cameras/")
  //Défini le type de fichier attendu, ici un json
  .then((res) => res.json())
  .then((data) => {
    //Boucle parcourant les  entrées du tableau
    for (let i = 0; i < data.length; i++) {
      //Défini la ou le code html sera crée
      let camera = document.querySelector(".cameras"),
        //Création des différents élements
        divFir = document.createElement("div"),
        divSec = document.createElement("div"),
        img = document.createElement("img"),
        lien = document.createElement("a"),
        price = document.createElement("p"),
        name = document.createElement("h3"),
        description = document.createElement("p");

      //On défini la structure de la section
      camera.appendChild(divFir);
      divFir.appendChild(img);
      divFir.appendChild(divSec);
      divSec.appendChild(lien);
      lien.appendChild(name);
      divSec.appendChild(description);
      divSec.appendChild(price);

      //On attribu les données à chaque élement
      img.src = data[i].imageUrl;
      lien.href = "front-end/webpages/produit.html?id=" + data[i]._id;
      price.innerText = (data[i].price / 100).toLocaleString("fr") + " €";
      name.innerText = data[i].name;
      description.innerText = data[i].description;

      //Ajout de classes CSS
      divFir.className = "col-fr";
      divSec.className = "col-sc";
    }
    //Affichage dans la console du navigateur
    console.log(data);
  });
