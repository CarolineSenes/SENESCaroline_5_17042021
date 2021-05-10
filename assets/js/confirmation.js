//On récupère la réponse du serveur renvoyée par POST
const order = JSON.parse(localStorage.getItem('order'));
console.log('Réponse serveur :', order)

//On récupère les infos à intégrer dans la page confirmation
const id = order.orderId
console.log('orderId :', id)

const firstName = order.contact.firstName
console.log('firstName:', firstName)

const prixTotal = JSON.parse(localStorage.getItem('prixTotal'));
console.log('prixTotal :', prixTotal)

//On intègre le HTML
    document.getElementById("recap").innerHTML += 
        `<p>Merci ${firstName}</p>
        <p class="commande">Votre commande d'un montant de ${prixTotal}€ a été enregistrée !</p>
        <p>Elle porte le numéro : ${id}</p>`
    ;

//On vide le localStorage
localStorage.clear()