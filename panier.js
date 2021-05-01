//Stocker dans une variable les valeurs récupérées dans le localStorage enconvertissant les données en JS
let valeursStockees = JSON.parse(localStorage.getItem("produit"));
console.log('Le localStorage contient les éléments : ', valeursStockees);


//AFFICHER PRODUITS DU PANIER

//Si panier vide
if(valeursStockees === null){
    document.getElementById("panier").innerHTML += 
    `<article id="etat-panier" class="card card--panier-vide">
        <div class="card__texte card__texte--paniervide">
            <p>Le panier est vide</p>
        </div>
    </article>`;

    console.log('Le panier est vide');

}else{
    console.log('Le panier n\'est PAS vide');

    //On récupère les produits
    for (let valeurStockee of valeursStockees){
        console.log(`Le panier contient`, valeursStockees.length, `produits`);
        
        //on intègre les HTML pour chacun
        document.getElementById("recap-panier").innerHTML += 
        `<div class="card__texte card__texte--produit card__texte--panier">
                <h2>${valeurStockee.name}</h2>
                <p>${valeurStockee.lentilles}</p>
                <p>${valeurStockee.price}</p>
                <button class="btn btn--suppr"><a href="">Supprimer</a></button>
        </div>`;
    }

}
