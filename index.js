//On récupère les données de l'API au format JSON
fetch('http://localhost:3000/api/cameras')
    .then(function(res){
        return res.json()
    })
    //On récupère les produits
    .then(function(produits){
        for(let produit of produits){

	    //Conversion du prix
		let entierPrice = produit.price /100
  		//let finalPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(entierPrice)

	    //On intègre le HTML
		document.getElementById("catalogue").innerHTML += 
        `<article class="card">
            <a href="./pages/produit.html?id=${produit._id}" id="article__link">
                <img src=${produit.imageUrl} alt="${produit.name}" id="article__img" />
                <div class="card__texte">
                    <h2 id="article__name">${produit.name}</h2>
                    <p id="article__price">${entierPrice} €</p>
                </div>
            </a>
        </article>`
        }
    })
    .catch(function(error) {
        alert('Ressource non trouvée')
    })