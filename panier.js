//On récupère les données stockées dans le localstorage
const panier = JSON.parse(localStorage.getItem('produits'));
console.log('Le localStorage contient les éléments : ', panier);


//////////////////////////////////////// AFFICHER PRODUITS DU PANIER ////////////////////////////////////

//Si panier vide
if(panier === null){
    document.getElementById('panier').innerHTML += 
    `<article id="etat-panier" class="card card--panier-vide">
        <div class="card__texte card__texte--paniervide">
            <p>Le panier est vide</p>
        </div>
    </article>`;

    console.log('Le panier est vide');

}else{
    console.log('Le panier n\'est PAS vide');

    //On récupère les produits
    for (let article of panier){
        console.log(`Le panier contient`, panier.length, `articles`);
        
        //on intègre le HTML pour chacun
        document.getElementById("recap-panier").innerHTML += 
        `<div class="card__texte card__texte--produit card__texte--panier">
                <h2>${article.name}</h2>
                <p>${article.lentilles}</p>
                <p>${article.price} €</p>
        </div>`;
    }
}


//////////////////////////////////////////////// TOTAL DU PANIER /////////////////////////////////////////

//On créé un tableau vide
let totalPanier = [];

//On créé une boucle pour push chq prix au tableau à chq tour de boucle
for (let article of panier){
    totalPanier.push(article.price)
    console.log(`Push prix au panier :`, totalPanier);
};

//Addition des prix présents dans le tableau totalPanier
const reducer = function(accumulator, currentValue) {
     return accumulator + currentValue
};
const prixTotal = totalPanier.reduce(reducer,0); //0 = valeur initiale obligatoire
console.log('TOTAL du panier :', prixTotal);

//On envoie le prix total au localStorage
localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

//On intègre le HTML
document.getElementById("total-panier").innerHTML += 
`<div class="card__texte card__texte--produit">
    <p>Total du panier = ${prixTotal} €</p>
</div>`;


//////////////////////////////////////////// FORMULAIRE COMMANDE ////////////////////////////////////////

//On intègre le HTML
document.getElementById("coordonnees").innerHTML += 
    `<h2>Saisissez vos coordonnées :</h2>
    <form action="" method="POST" class="formulaire" id="formulaireCommande">
        <div class="champs">
            <label for="nom">Votre nom : </label><small id='messageNom' class='text-danger'></small>
            <input type="text" id="lastName" name="lastName" required>
            
        </div>

        <div class="champs">
            <label for="prenom">Votre prénom : </label><small id='messagePrenom' class='text-danger'></small>
            <input type="text" id="firstName" name="firstName" required>
        </div>

        <div class="champs">
            <label for="email">Votre adresse email : </label><small id='messageEmail' class='text-danger'></small>
            <input type="email" id="email" name="email">
            <small></small>
        </div>

        <div class="champs">
            <label for="rue">Votre adresse : </label><small id='messageAdresse' class='text-danger'></small>
            <input type="text" id="address" name="address" required>
        </div>

        <div class="champs">
            <label for="codePostal">Votre code postal : </label><small id='messageCodePostal' class='text-danger'></small>
            <input type="text" id="codePostal" maxlength="5" name="codePostal" required>
        </div>

        <div class="champs">
            <label for="ville">Votre ville : </label><small id='messageVille' class='text-danger'></small>
            <input type="text" id="city" name="city" required>
        </div>

        <button type="submit" id="order" name="order" class="btn btn--formulaire">Valider mes coordonnées</button>
    </form>`;
    

//On récupère les données du formulaire    

document
    .getElementById("formulaireCommande")
    .addEventListener("submit", function(e){
        e.preventDefault();
        //On récupère les valeurs dans un objet
        const contact = {
            lastName : document.getElementById("lastName").value,
            firstName : document.getElementById("firstName").value,
            email : document.getElementById("email").value,
            address : document.getElementById("address").value,
            // codePostal : document.getElementById("codePostal").value,
            city : document.getElementById("city").value,
        };

        //Validation du formulaire avant envoi
        ///définition des regex
        const regExPrenomNomVille = function(value){
            return /^[a-zA-Z-\s]{3,20}$/.test(value);
        };
        const regExCodePostal = function(value){
            return /^[0-9]{5}$/.test(value);
        };

        const regExEmail = function(value){
            return /^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9_.-]+[.]{1}[a-zA-Z]{2,10}$/.test(value);
        };

        const regExAdresse = function(value){
            return /^[a-zA-Z0-9\s]{5,50}$/.test(value);
        };

        ///définition des messages d'erreurs
        function dataChampManquantTextVide(e){
            document.querySelector(`#${e}`).textContent = "";
        };

        function dataChampManquantText(e){
            document.querySelector(`#${e}`).textContent = "Le format de ce champ n'est pas correct";
        };

        ///tests des champs
        function lastNameControl(){
            const leNom = contact.lastName;
            if(regExPrenomNomVille(leNom)){
                dataChampManquantTextVide("messageNom");
                return true;
            }else{
                dataChampManquantText("messageNom");
                return false;
            }
        };

        function firstNameControl(){
            const lePrenom = contact.firstName;
            if(regExPrenomNomVille(lePrenom)){
                dataChampManquantTextVide("messagePrenom");
                return true;
            }else{
                dataChampManquantText("messagePrenom");
                return false;
            }
        };

        function emailControl(){
            const leEmail = contact.email;
            if(regExEmail(leEmail)){
                dataChampManquantTextVide("messageEmail");
                return true;
            }else{
                dataChampManquantText("messageEmail");
                return false;
            }
        };

        function adressControl(){
            const leAdresse = contact.address;
            if(regExAdresse(leAdresse)){
                dataChampManquantTextVide("messageAdresse");
                return true;
            }else{
                dataChampManquantText("messageAdresse");
                return false;
            }
        };

        // function codePostalControl(){
        //     const leCodePostal = contact.codePostal;
        //     if(regExCodePostal(leCodePostal)){
        //         dataChampManquantTextVide("messageCodePostal");
        //         return true;
        //     }else{
        //         dataChampManquantText("messageCodePostal");
        //         return false;
        //     }
        // };

        function cityControl(){
            const leVille = contact.city;
            if(regExPrenomNomVille(leVille)){
                dataChampManquantTextVide("messageVille");
                return true;
            }else{
                dataChampManquantText("messageVille");
                return false;
            }
        };
        
        ///Contrôle validité formulaire avant envoi dans localStorage
        if(lastNameControl() && firstNameControl() && emailControl() && adressControl() && cityControl()){
            //On appelle la fonction de POST
            sendForm()
        }else{
            console.log(`ERR : Le formulaire n'est pas bien rempli`);
        };


        ////////////////////////////////////// POST //////////////////////////////////////////////////////
        
        function sendForm(){
            //On envoie les id des produits dans un tableau
            let products = []
                panier.forEach(product => {
                products.push(product.id)
                });
            console.log(`Tableau "product_id" : `, products);

            //on regroupe l'objet contact et le tableau des id products
            const aEnvoyer = {
                contact : contact,
                products : products,
            };
            console.log('Données à envoyer : ', aEnvoyer);

            //on envoie nos données au serveur
            fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(aEnvoyer),
            })
            .then(function(res) {
                if (res.ok){
                    return res.json();
                }
            })
            .then(function(res) {
                let order = JSON.stringify(res)
                localStorage.setItem('order', order)
                console.log('Réponse serveur format JSON :', order)
                window.location.href = 'confirmation.html';
            })
            .catch(function() {
                alert('Impossible d\'envoyer la requête');
            })
        }
        // async function sendForm() {
        //     try {
        //         //on envoie au localStorage l'objet contact
        //         console.log(`Objet "contact"`, contact);
        //         localStorage.setItem("contact", JSON.stringify(contact));

        //         //on envoie au localStorage le tableau des id produits du panier
        //         let products = [];
        //         panier.forEach(product => {
        //             products.push(product.id)
        //         })
        //         console.log(`Tableau "product_id"`, products);
        //         localStorage.setItem("products", JSON.stringify(products));

        //         //création d'un objet qui contient contact et id (voir body du POST)
        //         const request = {
        //             contact : contact,
        //             products : products,
        //         }
        //         console.log('Request', request)

        //         let response = await fetch("http://localhost:3000/api/cameras/order", {
        //             method: "POST",
        //             headers: {
        //             "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify(request),
        //         });
              
        //         if (response.ok) {
        //             window.location.href = "confirmation.html";
        //             console.log(response);
        //         } else {
        //             console.log ("err");
        //         }
        //     }
        //     catch (e) {
        //         console.log(e);
        //     }
        // }
    });