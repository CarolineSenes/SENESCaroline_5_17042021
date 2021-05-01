//on appelle notre fonction
main()

//on attend les résultats des promesses
async function main(){
    const articles = await getArticles()
    for (article of articles){
        displayArticle(article);
    }
}

//on récupère les données
function getArticles(){
    return fetch('http://localhost:3000/api/cameras')
        .then(function(res){
            if(res.ok){
            return res.json();
            }
        })
        .then(function(articles){
            return articles
        })
        .catch(function(err){
            alert('Ressources non trouvées')
        })
}

//on insère les données
function displayArticle(article){
    document.getElementById("catalogue").innerHTML += `
    <article class="card">
    <a href="./pages/produit.html?id=${article._id}" id="article__link">
      <img src=${article.imageUrl} alt="${article.name}" id="article__img" />
      <div class="card__texte">
        <h2 id="article__name">${article.name}</h2>
        <p id="article__price">${article.price}€</p>
      </div>
    </a>
  </article>`
}
