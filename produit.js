//On récupère l'ID dans l'URL
const parametresUrl = new URLSearchParams(window.location.search) 
const produitId = parametresUrl.get("given_id") 
console.log(`L'id du produit est :`, produitId)


//On récupère le produit au format JSON
fetch(`http://localhost:3000/api/cameras/${produitId}`)
    .then(function(data){
        return data.json()
    })

    //On récupère le produit
    .then(function(article){
        console.log(`Les data du produits sont :`, article)

	    //Conversion du prix
		let entierPrice = article.price /100
  		//let finalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(entierPrice)

	    //On intègre le HTML
        document.getElementById("produit").innerHTML += 
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

        console.log(`La liste des options est :`, article.lenses)

        //On intègre chaque option de lentilles (=data lenses) dans le HTML
        article.lenses.forEach(option =>{
            console.log(`Choix d'option :`, option)
            document.getElementById("lentilles").innerHTML += 
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
            console.log(`Les options :`, panierObjet);


            //LOCALSTORAGE

            //Stocker dans une variable les valeurs récupérées dans le localStorage en convertissant les données en JS
            let produitsValues = JSON.parse(localStorage.getItem("produits"));

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

            //fonction pour ajouter produit dans localStorage
                //on push les valeurs de la variable panierObjet dans le tableau déjà créé
                //on stocke le tableau des valeurs dans le localStorage en convertissant les données en string
            const ajoutProduitLocalStorage = function(){
                produitsValues.push(panierObjet);
                localStorage.setItem("produits", JSON.stringify(produitsValues));
            }

            //S'il y A déjà des produits dans le localStorage, condition sera true
            if(produitsValues){
                ajoutProduitLocalStorage();
                popupConfirmation();

            // S'il n'y a PAS de produits enregistrés dans le localStorage, condition sera false   
            }else{
                //on créé un tableau vide pour y mettre les valeurs de la variable panierObjet
                produitsValues = [];
                ajoutProduitLocalStorage();
                popupConfirmation();

            }

        })
    })

    .catch(function(error) {
        alert('Ressource non trouvée')
    })

