//On récupère l'ID dans l'URL
const parametresUrl = new URLSearchParams(window.location.search) 
const produitId = parametresUrl.get("given_id") 
console.log(`Id du produit :`, produitId)

const url = `http://localhost:3000/api/cameras/${produitId}`;

const htmlProduit = document.getElementById("produit");

//On récupère le produit
fetch(url)
    .then(function(res){
        if(res.ok){
        console.log('Connexion API :', res.ok)
        return res.json()
        }
    })

    //On récupère le produit
    .then(function(article){
        console.log(`Produit récupéré :`, article)

	    //Conversion du prix
		let entierPrice = article.price /100
  		//let finalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(entierPrice)

	    //On intègre le HTML
        htmlProduit.innerHTML += 
        `<form class="card card--produit">
            <img src=${article.imageUrl} alt="${article.name}">
            <div id="carte_produit" class="card__texte card__texte--produit">
                <h2>${article.name}</h2>
                <p>${article.description}</p>
                <p>
                    <label for="lentilles">Personnalisation de lentille : </label>
                    <select name="lentilles" id="lentilles"></select>
                </p>    
                <p>${entierPrice} €</p>
                <button type="submit" id="ajoutPanier" class="btn btn--panier">Ajouter au panier</button>
            </div>
        </form>`


        //PERSONNALISATION
        //On intègre chaque option de lentilles (=data lenses) dans le HTML
        const htmlOptions = document.getElementById("lentilles");

        article.lenses.forEach(function(option){
            console.log(`Option :`, option)
            htmlOptions.innerHTML += 
            `<option value="${option}">${option}</option>`
        }) 
        

        //RECUPERATION DES CHOIX UTILISATEUR

        document
            .querySelector('form')
            .addEventListener("submit", function(e){
                e.preventDefault()
                let optionLentille = e.target.lentilles.value
                console.log(`Option sélectionnée :`, optionLentille)

            //Récupération des valeurs du formulaire dans un objet
            let panierObjet = {
                id : article._id,
                imageUrl : article.imageUrl,
                name : article.name,
                price : entierPrice,
                lentilles : optionLentille,
            }
            console.log(`Produit ajouté au panier :`, panierObjet);


            //LOCALSTORAGE

            //Stocker dans une variable, les clés/valeurs du localStorage + conversion JSON->Objet JS
            let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produits"));
            console.log('null si localStorage vide :', produitEnregistreDansLocalStorage)

            //fonction pop up
            const popupConfirmation = function(){
                if(window.confirm(`L'appareil photo ${article.name} avec l'option: ${optionLentille} a bien été ajouté au panier.
                Consulter le panier : OK
                Revenir à l'accueil : ANNULER`)){
                    window.location.href = "panier.html";
                }else{
                    window.location.href = "../index.html";
                }
            }

            //Ajouter produit dans localStorage
            const ajoutProduitLocalStorage = function(){
                //on push les valeurs de l'objet panierObjet dans le tableau déjà créé ligne 109
                produitEnregistreDansLocalStorage.push(panierObjet); 
                //on stocke le tableau des valeurs dans le localStorage (au format JSON) pour garder contenu du panier
                localStorage.setItem("produits", JSON.stringify(produitEnregistreDansLocalStorage));
            }

            //S'il y A déjà des produits dans le localStorage, condition sera true
            if(produitEnregistreDansLocalStorage){
                console.log(`Le localStorage n'est pas vide`)
                ajoutProduitLocalStorage();
                popupConfirmation();

            // S'il n'y a PAS de produits enregistrés dans le localStorage, condition sera false   
            }else{
                //on créé un tableau vide
                produitEnregistreDansLocalStorage = [];
                console.log('Le localStorage est vide :', produitEnregistreDansLocalStorage)
                ajoutProduitLocalStorage();
                popupConfirmation();
            }
        })
    })
    .catch(function() {
        window.location.href = '404.html';
    })
