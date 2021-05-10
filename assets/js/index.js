const url = 'http://localhost:3000/api/cameras';
const htmlCatalogue = document.getElementById('catalogue');

//On récupère les données de l'API
fetch(url)
    .then(function(res){
        if(res.ok){
            console.log('Connexion API :', res.ok)
            return res.json();
        }    
    })
    //On récupère les produits
    .then(function(produits){
        console.log(`Nombre de produits récupérés de l'API :`, produits.length)

        for(let produit of produits){
        console.log(`Informations de chaque article :`, produit)

	    //Conversion du prix
		let entierPrice = produit.price /100

	    //On intègre le HTML
		htmlCatalogue.innerHTML += 
        `<article class="card">
            <a href="./pages/produit.html?given_id=${produit._id}" id="article__link">
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
        window.location.href = 'pages/404.html';
    })

