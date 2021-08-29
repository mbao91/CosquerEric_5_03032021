let objPanier = JSON.parse(localStorage.getItem("panier"));

panier();

let orderId = localStorage.getItem('orderId');
let afficheOrderID = document.querySelector('#orderID');
afficheOrderID.textContent=orderId;

//Vide le localstorage apres une commande
localStorage.removeItem('panier');
localStorage.removeItem('orderID');

//Parcours le panier et affiche les objets + le total de la commande
function panier() {
    for(i=0; i<objPanier.length; i++) {
        afficheCamera(i);
    }
    //affiche le prix total de la commande
    prixTotal();
}

//Affiche un élement du panier
function afficheCamera(i) {
    // Création des éléments
    let commande = document.querySelector("#panier"),
        objCommande = document.createElement("div"),
        name = document.createElement("h3"),
        quantite = document.createElement("h3"),
        price = document.createElement("h4"),
        image = document.createElement("img"),
        choosenCamera = document.createElement("h4");

    // Remplissage des éléments
    name.textContent=objPanier[i].name;
    quantite.textContent= "X"+objPanier[i].number;
    image.src = objPanier[i].img;
    choosenCamera.textContent=objPanier[i].camera;
    price.textContent=((objPanier[i].price * objPanier[i].number) / 100).toLocaleString("fr") + " €";


    // Placement des éléments
    commande.appendChild(objCommande);
    objCommande.appendChild(name);
    objCommande.appendChild(quantite);
    objCommande.appendChild(price);
    objCommande.appendChild(choosenCamera);
    objCommande.appendChild(image);

    //Ajout de classes CSS
    objCommande.className="p-2 bd-highlight objCommande";

}

//Calcul et affichage du prix total
function prixTotal() {
    let total = 0;
    for (let j= 0; j < objPanier.length; j++) {
        total = total + objPanier[j].price * objPanier[j].number;
    }
    let afficheTotal = document.querySelector("#total");
    afficheTotal.textContent=("Total : " + (total / 100).toLocaleString("fr") + " €");
}