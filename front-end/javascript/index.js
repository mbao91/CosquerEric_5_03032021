//Lien vers l'API
fetch("http://localhost:3000/api/cameras/")
    //Défini le type de fichier attendu, ici un json
    .then(res => res.json())
    .then(data => {
        //Boucle parcourant les  entrées du tableau
        for (let i=0; i<data.length; i++) {
            //Défini la ou le code html sera crée
            let camera = document.querySelector('#camera'),
            //Création des différents élements
            div = document.createElement('div'),
            img = document.createElement('img'),
            lien = document.createElement('a'),
            price = document.createElement('p'),
            name = document.createElement('h3'),
            description = document.createElement('p');

            //On défini la structure de la section
            camera.appendChild(div);
            div.appendChild(img);
            div.appendChild(lien);
            lien.appendChild(name);
            div.appendChild(description);
            div.appendChild(price);

            //On attribu les données à chaque élement
            img.src = data[i].imageUrl;
            lien.href = 'webpages/produit.html?id='+data[i]._id;
            price.innerText = (data[i].price / 100).toLocaleString("fr") + " €";
            name.innerText = data[i].name;
            description.innerText = data[i].description;

            //Ajout de classes CSS
            div.className='col-sm';
        }
        //Affichage dans la console du navigateur
        console.log(data)
    });