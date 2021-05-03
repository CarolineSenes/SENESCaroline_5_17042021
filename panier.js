//Stocker dans une variable les valeurs récupérées dans le localStorage enconvertissant les données en JS
let produitsValues = JSON.parse(localStorage.getItem("produit"));
console.log('Le localStorage contient les éléments : ', produitsValues);


//AFFICHER PRODUITS DU PANIER

//Si panier vide
if(produitsValues === null){
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
    for (let valeurStockee of produitsValues){
        console.log(`Le panier contient`, produitsValues.length, `produits`);
        
        //on intègre le HTML pour chacun
        document.getElementById("recap-panier").innerHTML += 
        `<div class="card__texte card__texte--produit card__texte--panier">
                <h2>${valeurStockee.name}</h2>
                <p>${valeurStockee.lentilles}</p>
                <p>${valeurStockee.price} €</p>
        </div>`;
    }
}

//btn suppr/article non fonctionnels (optionnels)


//TOTAL DU PANIER

//on créé un tableau vide
let totalPanier = [];

//on créé un boucle pour push chq prix au tableau à chq tour de boucle
for (let valeurStockee of produitsValues){
    totalPanier.push(valeurStockee.price)
    console.log(`Push au panier :`, totalPanier);
}

//addition des prix présents dans le tableau totalPanier
const reducer = function(accumulator, currentValue) {
     return accumulator + currentValue
};
const prixTotal = totalPanier.reduce(reducer,0); //0 = valeur initiale obligatoire
console.log(prixTotal);

//on intègre le HTML
document.getElementById("total-panier").innerHTML += 
`<div class="card__texte card__texte--produit">
    <p>Total du panier = ${prixTotal} €</p>
</div>`;


//FORMULAIRE COMMANDE

//on intègre le HTML
document.getElementById("formulaireCommande").innerHTML += 
    `<div class="champs">
        <label for="nom">Votre nom : </label><small id='messageNom' class='text-danger'></small>
        <input type="text" id="nom" name="nom" required>
        
    </div>

    <div class="champs">
        <label for="prenom">Votre prénom : </label><small id='messagePrenom' class='text-danger'></small>
        <input type="text" id="prenom" name="prenom" required>
    </div>

    <div class="champs">
        <label for="email">Votre adresse email : </label><small id='messageEmail' class='text-danger'></small>
        <input type="email" id="email" name="email">
        <small></small>
    </div>

    <div class="champs">
        <label for="rue">Votre adresse : </label><small id='messageAdresse' class='text-danger'></small>
        <input type="text" id="rue" name="rue" required>
    </div>

    <div class="champs">
        <label for="codePostal">Votre code postal : </label><small id='messageCodePostal' class='text-danger'></small>
        <input type="text" id="codePostal" maxlength="5" name="codePostal" required>
    </div>

    <div class="champs">
        <label for="ville">Votre ville : </label><small id='messageVille' class='text-danger'></small>
        <input type="text" id="ville" name="ville" required>
    </div>

    <button type="submit" id="envoyerFormulaire" name="envoyerFormulaire" class="btn btn--formulaire">Valider mes coordonnées</button>`;


//RECUPERATION DES VALEURS DU FORMULAIRE    

document
    .getElementById("envoyerFormulaire")
    .addEventListener("click", function(e){
        e.preventDefault();
        //On récupère les valeurs dans un objet
        const formulaireValues = {
            nom : document.getElementById("nom").value,
            prenom : document.getElementById("prenom").value,
            email : document.getElementById("email").value,
            rue : document.getElementById("rue").value,
            codePostal : document.getElementById("codePostal").value,
            ville : document.getElementById("ville").value,
        }

        //Validation du formulaire avant envoi
        const regExPrenomNomVille = function(value){
            return /^[a-zA-Z-\s]{3,20}$/.test(value);
        }
        const regExCodePostal = function(value){
            return /^[0-9]{5}$/.test(value);
        }

        const regExEmail = function(value){
            return /^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9_.-]+[.]{1}[a-zA-Z]{2,10}$/.test(value);
        }

        const regExAdresse = function(value){
            return /^[a-zA-Z0-9\s]{5,50}$/.test(value);
        }

        const textAlert = function(value){
            return `${value} Uniquement lettres et - autorisés (entre 3 et 20 caractères)`;
        }

        function dataChampManquantTextVide(e){
            document.querySelector(`#${e}`).textContent = "";
        };

        function dataChampManquantText(e){
            document.querySelector(`#${e}`).textContent = "Le format de ce champ n'est pas correct";
        };

        function nomControle(){
            //contrôle validité du nom
            const leNom = formulaireValues.nom;
            if(regExPrenomNomVille(leNom)){
                dataChampManquantTextVide("messageNom");
                return true;
            }else{
                document
                dataChampManquantText("messageNom");
                return false;
            }
        };

        function prenomControle(){
            //contrôle validité du prénom
            const lePrenom = formulaireValues.prenom;
            if(regExPrenomNomVille(lePrenom)){
                dataChampManquantTextVide("messagePrenom");
                return true;
            }else{
                dataChampManquantText("messagePrenom");
                return false;
            }
        };

        function emailControle(){
            //contrôle validité du email
            const leEmail = formulaireValues.email;
            if(regExEmail(leEmail)){
                dataChampManquantTextVide("messageEmail");
                return true;
            }else{
                dataChampManquantText("messageEmail");
                return false;
            }
        };

        function adresseControle(){
            //contrôle validité du adresse
            const leAdresse = formulaireValues.rue;
            if(regExAdresse(leAdresse)){
                dataChampManquantTextVide("messageAdresse");
                return true;
            }else{
                dataChampManquantText("messageAdresse");
                return false;
            }
        };

        function codePostalControle(){
            //contrôle validité du code postal
            const leCodePostal = formulaireValues.codePostal;
            if(regExCodePostal(leCodePostal)){
                dataChampManquantTextVide("messageCodePostal");
                return true;
            }else{
                dataChampManquantText("messageCodePostal");
                return false;
            }
        };

        function villeControle(){
            //contrôle validité de la ville
            const leVille = formulaireValues.ville;
            if(regExPrenomNomVille(leVille)){
                dataChampManquantTextVide("messageVille");
                return true;
            }else{
                dataChampManquantText("messageVille");
                return false;
            }
        };
        
        //contrôle validiter formulaire avant envoi dans localStorage
        if(nomControle() && prenomControle() && emailControle() && adresseControle() && codePostalControle() && villeControle()){
            //Mettre l'objet formulaireValues dans localStorage pour regrouper les valeurs
            localStorage.setItem('formulaireValues', JSON.stringify(formulaireValues));
        }else{
            alert('Veuillez bien remplir le formulaire');
        };

        //On met formulaireValues + produitsValues dans un objet pour envoi au localStorage
        const aEnvoyer =  {
            produitsValues,
            formulaireValues
        }
        console.log(`A envoyer au serveur :`, aEnvoyer);
    });

    

