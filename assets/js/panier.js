const htmlRecapPanier = document.getElementById("recap-panier")



//On récupère les données stockées dans le localstorage
const panier = JSON.parse(localStorage.getItem('produits'));
console.log('Le localStorage contient les éléments : ', panier);


//////////////////////////////////////// AFFICHER PRODUITS DU PANIER ////////////////////////////////////
//Si panier vide
if(panier === null){
    console.log('Le panier est vide');
    htmlRecapPanier.innerHTML += 
    `<div class="card__texte card__texte--paniervide">
            <p>Le panier est vide</p>
        </div>`;

//Si panier n'est pas vide    
}else{
    console.log('Le panier n\'est PAS vide');

    //On récupère les produits
    for (let article of panier){
        console.log('Informations de chaque produit :', article);
        //on intègre le HTML pour chacun
        htmlRecapPanier.innerHTML += 
        `<div class="card__texte card__texte--produit card__texte--panier">
                <h2>${article.name}</h2>
                <p>${article.lentilles}</p>
                <p>${article.price} €</p>
        </div>`;
    }
}


//////////////////////////////////////////////// TOTAL DU PANIER /////////////////////////////////////////
const htmlTotalPanier = document.getElementById("total-panier")

//On créé un tableau vide
let totalPanier = [];

    //On créé une boucle pour push chq prix au tableau à chq tour de boucle
    for (let article of panier){
        totalPanier.push(article.price)
    };
    console.log(`Push prix au total :`, totalPanier);

    //Addition des prix présents dans le tableau totalPanier
    const prixTotal = totalPanier.reduce(function(accumulator, currentValue){
        return (accumulator + currentValue);
    });
    console.log('TOTAL du panier :', prixTotal);

    //On envoie le prix total au localStorage
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));

    //On intègre le HTML
    htmlTotalPanier.innerHTML += 
    `<div class="card__texte card__texte--produit">
        <p>Total du panier = ${prixTotal} €</p>
    </div>`;

//////////////////////////////////////////// FORMULAIRE COMMANDE ////////////////////////////////////////
const htmlCoordonnees= document.getElementById("coordonnees")

//On intègre le HTML
htmlCoordonnees.innerHTML += 
    `<form action="" method="POST" class="formulaire" id="formulaireCommande">
    <h2>Saisissez vos coordonnées :</h2>
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
            <input type="email" id="email" name="email" required>
            <small></small>
        </div>

        <div class="champs">
            <label for="rue">Votre adresse : </label><small id='messageAdresse' class='text-danger'></small>
            <input type="text" id="address" name="address" required>
        </div>

        <div class="champs">
            <label for="ville">Votre ville : </label><small id='messageVille' class='text-danger'></small>
            <input type="text" id="city" name="city" required>
        </div>

        <button type="submit" id="order" name="order" class="btn btn--formulaire">Valider ma commande</button>
    </form>`;

//VALIDATION
///définition des regex
const regExPrenomNomVille = function(value){
    return /^[a-zéèàêâùïüëA-Z-\s\']{3,30}$/.test(value);
};

const regExEmail = function(value){
    return /^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9_.-]+[.]{1}[a-zA-Z]{2,10}$/.test(value);
};

const regExAdresse = function(value){
    return /^[a-zéèàêâùïüëA-Z0-9-\s\,\']{5,50}$/.test(value);
};

///définition des textes d'erreurs
function dataChampManquantTextVide(e){
    document.querySelector(`#${e}`).textContent = "";
};

function dataChampManquantText(e){
    document.querySelector(`#${e}`).textContent = "Le format de ce champ n'est pas correct";
};


//On récupère les données du formulaire    
document
    .getElementById("formulaireCommande")
    .addEventListener("submit", function(e){
        e.preventDefault();
        ///On récupère les valeurs dans un objet
        const contact = {
            lastName : document.getElementById("lastName").value,
            firstName : document.getElementById("firstName").value,
            email : document.getElementById("email").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
        };

        ///On teste les champs
        function lastNameControl(){
            const nom = contact.lastName;
            if(regExPrenomNomVille(nom)){
                dataChampManquantTextVide("messageNom");
                return true;
            }else{
                dataChampManquantText("messageNom");
                return false;
            }
        };

        function firstNameControl(){
            const prenom = contact.firstName;
            if(regExPrenomNomVille(prenom)){
                dataChampManquantTextVide("messagePrenom");
                return true;
            }else{
                dataChampManquantText("messagePrenom");
                return false;
            }
        };

        function emailControl(){
            const email = contact.email;
            if(regExEmail(email)){
                dataChampManquantTextVide("messageEmail");
                return true;
            }else{
                dataChampManquantText("messageEmail");
                return false;
            }
        };

        function adressControl(){
            const adresse = contact.address;
            if(regExAdresse(adresse)){
                dataChampManquantTextVide("messageAdresse");
                return true;
            }else{
                dataChampManquantText("messageAdresse");
                return false;
            }
        };

        function cityControl(){
            const ville = contact.city;
            if(regExPrenomNomVille(ville)){
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
            let aEnvoyer = {
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
            .then(function(res){
                let order = JSON.stringify(res)
                localStorage.setItem('order', order)
                console.log('Réponse serveur format JSON :', order)
                window.location.href = 'confirmation.html'
            })
            .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
            })
        }
    });