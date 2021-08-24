let camera=document.querySelector('#camera');

//on récupère les paramètres de l'url
let searchParams = window.location.search;

//on enlève le '?' pour n'avoir QUE les paramètres
let searchParamsOnly = searchParams.substring(1,window.location.search.length);

//on enlève le 'id=' pour n'avoir que l'id utilisable
let searchParamsId = searchParamsOnly.substring(3,window.location.search.length);

fetch("http://localhost:3000/api/cameras/"+searchParamsId) //Lien vers l'API
    .then(res => res.json()) //Défini le type de fichier attendu, ici un json
    .then(data => {

        //Création des différente éléments
        let img = document.querySelector('#imageProduct'),
            name = document.querySelector('#nameProduct'),
            description = document.querySelector('#descriptionProduct'),
            price = document.querySelector('#priceProduct'),
            lensesCameras = document.querySelector('#lensesCameras'),
            ajoutPanier = document.querySelector('#ajoutPanier');

        //Attribution des données pour chaque éléments
        img.src = data.imageUrl;
        img.alt = data.name;
        name.innerText = data.name;
        description.innerText = data.description;
        price.innerText = (data.price / 100).toLocaleString("fr") + " €";


        //Boucle permettant d'afficher le nom des lentilles liée à une caméra
        for (i=0; i<data.lenses.lenght; i++) {
            //Création de la balise option
            let lense = document.createElement('option');
            lense.value='lenses'+[i];
            lensesCameras.appendChild(lense);
            let txtLense = document.createTextNode(data.lenses[i]);
            lense.appendChild(txtLense);
        }

        let txtButton = document.createTextNode("Ajouter au panier");
        ajoutPanier.appendChild(txtButton);
        ajoutPanier.onclick = function() {
            addLocalstorage(data);
        }; 
    });

        //Fonction d'ajout au local storage
        function addLocalstorage(data) {

        //Récupération de la lentille choisie par l'utilisateur
        let choosenLense = document.getElementById("lensesCameras").options[document.getElementById('lensesCameras').selectedIndex].text;

        //Récupération du nombre choisi par l'utilisateur
        let choosenNumber = document.getElementById('quantite').value;

        //Création de l'objet avec les paramètres de la caméra
        const camera = {
            name: data.name,
            id: data._id,
            price: data.price,
            img: data.imageUrl,
            lense: choosenLense,
            number: choosenNumber,
        };

        //Récupération du localstorage
        const panier = localStorage.getItem('panier');
        //Si le localstorga est vide alors ajouter l'objet
        if (!panier) {
            localStorage.setItem('panier', JSON.stringify([camera]));
            localStorage.setItem('panier', JSON.stringify([camera]));
            //Sinon si un objet est identique mais avec un nombre différent
        }else{
            let arrayPanier = JSON.parse(panier);
            let valid = false;
            arrayPanier.forEach((article)=>{
                if(article.name===camera.name && article.lense===camera.lense){
                    article.number = +article.number + +camera.number;
                    valid = true;
                }
            });
            if(valid===false){
                arrayPanier.push(camera);
            }
            localStorage.setItem('panier', JSON.stringify(arrayPanier));
            alert("L'objet à été ajouté au panier");
        }
    }
