//On récupère l'ID dans l'URL
const parametresUrl = new URLSearchParams(window.location.search) 
const produitId = parametresUrl.get("id") 
console.log(`L'id du produit est :`, produitId)


//On récupère le produit au format JSON
fetch(`http://localhost:3000/api/cameras/${produitId}`)
    .then(function(data){
        return data.json()
    })

    //On récupère le produit
    .then(function(produit){
        console.log(`Les data du produits sont :`, produit)

	    //Conversion du prix
		let entierPrice = produit.price /100
  		let finalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(entierPrice)

	    //On intègre le HTML
        document.getElementById("produit").innerHTML += 
        `<form class="card card--produit">
            <img src=${produit.imageUrl} alt="${produit.name}">
            <div id="carte_produit" class="card__texte card__texte--produit">
                <h2>${produit.name}</h2>
                <p>${produit.description}</p>
                <p>
                    <label for="lentilles">Personnalisation de lentille : </label>
                    <select name="lentilles" id="lentilles"></select>
                </p>    
                <p>${finalPrice}</p>
                <button type="submit" id="ajoutPanier" class="btn btn--panier">Ajouter au panier</button>
            </div>
        </form>`


        //OPTIONS

        console.log(`La liste des options est :`, produit.lenses)

        //On intègre chaque option de lentilles (=data lenses) dans le HTML
        produit.lenses.forEach(option =>{
            console.log(`Choix d'option :`, option)
            document.getElementById("lentilles").innerHTML += 
            `<option value="${option}">${option}</option>`
        }) 

        
        //RECUPERATION DES CHOIX UTILISATEUR

        document
            .querySelector('form')
            .addEventListener("submit", function(e){
                e.preventDefault()
                let selectionOption = e.target.lentilles.value

                console.log(`Option sélectionnée :`, selectionOption)

            //Récupération des valeurs du formulaire dans un objet
            let optionsProduit = {
                id : produit._id,
                imageUrl : produit.imageUrl,
                name : produit.name,
                price : finalPrice,
                lentilles : selectionOption,
            }
            console.log(`Les options :`, optionsProduit);


            //LOCALSTORAGE

            //Stocker dans une variable les valeurs récupérées dans le localStorage enconvertissant les données en JS
            let valeursStockees = JSON.parse(localStorage.getItem("produit"));

            //fonction pop up
            const popupConfirmation = () =>{
                if(window.confirm(`L'appareil photo ${produit.name} avec l'option: ${selectionOption} a bien été ajouté au panier.
                Consulter le panier : OK
                Revenir à l'accueil : ANNULER`)){
                    window.location.href = "panier.html";
                }else{
                    window.location.href = "../index.html";
                }
            }

            //S'il y A déjà des produits dans le localStorage, condition sera true
            if(valeursStockees){
                //on push les valeurs de la variable optionsProduit dans le tableau déjà créé
                valeursStockees.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(valeursStockees));
                popupConfirmation();

            // S'il n'y a PAS de produits enregistrés dans le localStorage, condition sera false   
            }else{
                //on créé un tableau vide pour y mettre les valeurs de la variable optionsProduit
                valeursStockees = [];
                valeursStockees.push(optionsProduit);
                //on stocke le tableau des valeurs dans le localStorage en convertissant les données en JSON
                localStorage.setItem("produit", JSON.stringify(valeursStockees));
                popupConfirmation();

            }



            // //The condition of the empty basket is True
            // if (localStorage.length == 0) {
            //     //console.log("Panier vide")

            //     //Object added to basket
            //     let newBasketObjects = []
            //     newBasketObjects.push(optionsProduit);

            //     //Object transformed from JSON
            //     let basketProducts = JSON.stringify(newBasketObjects)

            //     //LocalStorage created with the object
            //     localStorage.setItem('basket', basketProducts)

            // //The condition of the empty basket is False
            // }else{
            //     //console.log("Panier déjà rempli")

            //     //Basket retrieved and transformed into JSON
            //     let oldBasket = localStorage.getItem('basket')

            //     let newBasketObjects = JSON.parse(oldBasket)

            //     //Object added to basket
            //     newBasketObjects.push(optionsProduit);
            //     //console.log(newBasketObjects)


            //     let basketProducts = JSON.stringify(newBasketObjects)
            //     //console.log(basketProducts)

            //     //LocalStorage added
            //     localStorage.setItem('basket', basketProducts)
            // }
        })
    })

    .catch(function(error) {
        alert('Ressource non trouvée')
    })

