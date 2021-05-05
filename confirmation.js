//On récupère le numéro de commande (order) renvoyé par POST
const order = JSON.parse(localStorage.getItem('order'));
console.log('Réponse serveur format JS :', order)

//On récupère les infos à intégrer dans la page confirmation
const id = order.orderId
console.log('Réponse serveur orderId :', id)

const firstName = order.contact.firstName
console.log('Réponse serveur firstName:', firstName)

const prixTotal = JSON.parse(localStorage.getItem('prixTotal'));
console.log('Réponse serveur prixTotal :', prixTotal)

//On intègre le HTML
document.getElementById("intro").innerHTML += 
`<p>Merci ${firstName}</p>
<h1>Votre commande d'un montant de ${prixTotal}€ a été enregistrée !</h1>
<p>Elle porte le numéro : ${id}</p>
`;

//On vide le localStorage
localStorage.clear()