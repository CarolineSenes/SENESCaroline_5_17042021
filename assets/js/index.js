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
        `<article class="col card-group">
            <div class="card mb-4 mb-lg-0 shadow">
                <a href="./pages/produit.html?given_id=${produit._id}" class="stretched-link" id="article__link"></a>
                <img src=${produit.imageUrl} alt="${produit.name}" class="card-img-top h-100">
                <div class="card-body">
                    <h5 class="card-title">${produit.name}</h5>
                    <p class="card-text">${entierPrice} €</p>
                </div>
            </div>
        </article>`
        }
    })
    .catch(function(error) {
        window.location.href = 'pages/404.html';
    })
