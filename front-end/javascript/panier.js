//Récupération du localStorage
let objPanier = JSON.parse(localStorage.getItem('panier'));

//Déclaration de deux variable permettant le calcul du prix d'un article et de la commande compléte
let prixAdjust = 0,
    prixArticle = 0;

//Si le panier est vide alors on affiche "Panier vide"
if (objPanier.length===0) {
    let panierVide = document.querySelector('#panierVide');
    panierVide.innerText = "Votre panier est vide";
    //Sinon on créer l'affichage des objets du localstorage
} else {
    for (let i=0; i<objPanier.length; i++) {
        //Création des différents élements
        let divRow = document.querySelector('#divRow'),
        divCol = document.createElement('div'),
        name = document.createElement('p'),
        prix = document.createElement('p'),
        camera = document.createElement('p'),
        number = document.createElement('p');

        //On défini la structure de la section
        divRow.appendChild(divCol);
        divCol.appendChild(name);
        divCol.appendChild(prix);
        divCol.appendChild(camera);
        divCol.appendChild(number);

        //On attribu les données à chaque élement
        name.textContent = " Produit : "+objPanier[i].name;
        prix.textContent = " Prix unitaire : "+(objPanier[i].price/100).toLocaleString("fr") + " €";
        camera.textContent = " Camera : "+objPanier[i].cameras;
        number.textContent = " Quantité : "+objPanier[i].number;

        //Ajout de classes CSS
        divCol.className = "p-2";
        //Création du bouton permettant de modifier la quantité d'un objet (-1)
        let articleLess = document.createElement('button');
        let txtBtnLess = document.createTextNode('-');
        articleLess.className = "btn btn-primary";
        articleLess.appendChild(txtBtnLess);
        number.appendChild(articleLess);

        //Si la quantité d'un article est > 0 on fait -1
        if (objPanier[i].number > 0) {
            articleLess.onclick = function() {
                let objActu = objPanier[i];
                //Appel de la fonction articleMoins
                articleMoins(objActu);
            }
            //Sinon on supprime l'article 
        }else {
            let objActu = objPanier[i];
            //Appel de la fonction articleSuppr
            articleSuppr(objActu);
        };

        //Création du bouton permettant de modifier la quantité d'un objet (+1)
        let articleMore = document.createElement('button');
        let txtBtnMore = document.createTextNode('+');
        articleMore.className = "btn btn-primary";
        articleMore.appendChild(txtBtnMore);
        number.appendChild(articleMore);
        articleMore.onclick = function() {
            let objActu = objPanier[i];
            //Appel de la fonction articlePlus
            articlePlus(objActu);
        };
            
        //Création du bouton permettant de supprimer un objet
        let basketDel = document.createElement('button');
        let txtBtnDel = document.createTextNode('Supprimer');
        basketDel.className = "btn btn-primary";
        basketDel.appendChild(txtBtnDel);
        divCol.appendChild(basketDel);
        basketDel.onclick = function () {
            let objActu = objPanier[i];
            //Appel de la fonction articleSuppr
            articleSuppr(objActu);
        };

        //Calcul du prix d'un article (prix unitaire * nombre d'objet)
        prixPanier = (objPanier[i].price * objPanier[i].number);
        let showPriceArticle = document.createElement('p');
        let showTotalArticle = document.createTextNode("le prix total pour cet article est de : " +(prixPanier/100).toLocaleString("fr") + " €");
        divCol.appendChild(showPriceArticle);
        showPriceArticle.appendChild(showTotalArticle);
            //A chaque tout de boucle, le prix d'un article s'ajoute au précédant
        prixAdjust = prixAdjust + prixPanier;
    }

    ///Défini la ou le code html sera crée
    let form = document.querySelector('form');

    //Récupétation du prix total de la commande
    prixTotal = prixAdjust;
    let totalCommande = document.createElement('p');
    form.appendChild(totalCommande);
    let afficheTotalCommande = document.createTextNode('Le prix total de la commande est de : '+(prixTotal/100).toLocaleString("fr") + " €");
    totalCommande.appendChild(afficheTotalCommande);

    let btnConfirmCommande = document.querySelector("#confirmCommande");
    btnConfirmCommande.addEventListener("click", confirmCommande);


    function confirmCommande () {


        //Récuperation des informations données dans le formulaire
        let nom = document.getElementById("lastName").value,
            prenom = document.getElementById("firstName").value,
            adresse = document.getElementById("adress").value,
            ville = document.getElementById("city").value,
            email = document.getElementById("email").value,
            nomRegex = /\d/.test(nom),
            prenomRegex = /\d/.test(prenom),
            villeRegex = /\d/.test(ville),
            emailRegex = /@/.test(email);

        if (  nom=== "" || prenom=== "" || adresse=== "" || ville=== "" || email=== "") {
            alert("Certains champs ne sont pas renseigné");
        } else if (emailRegex === false) {
            alert("Le format de l'adresse Email n'est pas valide");
        }else if (nomRegex === true || prenomRegex === true  || villeRegex === true ) {
            alert("Les champs Nom, Prenom et Ville ne peuvent pas contenir de chiffres");
        }else{
            //Création d'un objet contact
            let contact = {
                firstName: prenom,
                lastName: nom,
                address: adresse,
                city: ville,
                email: email,
            };

            let productIds = [];
            let panier = JSON.parse(localStorage.getItem('panier'));
            panier.forEach((article) => {
                productIds.push(article.id);
            });

            fetch("http://localhost:3000/api/cameras/order",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        contact: contact,
                        products: productIds,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }).then(res => res.json())
                .then(data => {
                    localStorage.setItem("orderId", data.orderId);
                    window.location.href = "../webpages/commande.html";
                })
            alert('Merci de votre commande !');
        }
    }
}

//Fonction qui retire 1 au nombre d'objet
function articleMoins (objActu){
    objPanier.forEach((article) => {
        //Si le nom et la couleur de l'article corespond à l'objet créer alors
        if (article.name === objActu.name&& article.camera === objActu.camera) {
            //On retire -1 au nombre d'objet
            article.number--;
        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(objPanier));
    history.go(0);
}

//Fonction qui ajout 1 au nombre d'objet
function articlePlus (objActu){
    //Parcours les objets du tableau objPanier
    objPanier.forEach((article) => {
        //Si le nom et la couleur de l'article corespond à l'objet créer alors
        if (article.name === objActu.name &&article.camera === objActu.camera) {
            //On ajoute +1 au nombre d'objet
            article.number++;

        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(objPanier));
    //Actualistation de la page
    history.go(0);
}

//Fonction de supression d'article
function articleSuppr (objActu) {
    let panier = JSON.parse(localStorage.getItem('panier'));

    panier.forEach((article,index)=> {
        if (objActu.name === article.name &&objActu.camera === article.camera) {
            panier.splice(index,1);
        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(panier));
    history.go(0);
}
    
