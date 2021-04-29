// on attrape notre formulaire ayant l'id coordoonneesForm
let form = document.querySelector('#coordonneesForm');

// Ecoute de l'évenement voulu dans notre variable form
form.email.addEventListener('change', function(){ //ecoute des modif email
    validEmail(this);
});

form.tel.addEventListener('change', function(){ //ecoute des modif tel
    validTel(this);
});

// Ecoute de l'évenement submit dans notre variable form pour activer ou pas l'envoi des données
form.addEventListener('submit', function(e){
    e.preventDefault();
    if (validEmail(form.email) && (validTel(form.tel))){ //si validEmail et validTel renvoient true
        form.submit(); //on envoie
    }
});

const validEmail = function(saisieEmail){
    // on créé notre regex pour la valid email
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9_.-]+[@]{1}[a-zA-Z0-9_.-]+[.]{1}[a-zA-Z]{2,10}$', 'g' // g= utiliser la regex de manière globale
    );
    // on teste si la saisie user est conforme à la regex
    let testEmail = emailRegExp.test(saisieEmail.value);
    let small = saisieEmail.nextElementSibling; // attrape la balise small après saisieEmail pour la modifier
    if(testEmail == true){ // si test est true, on recupere la balise small en-dessous
        small.innerHTML = "Email valide";
        small.classList.remove('text-danger'); //supp d'un style CSS si déjà présent
        small.classList.add('text-success'); //ajout d'un style CSS
        return true;
    }
    else{
        small.innerHTML = "Email non valide";
        small.classList.remove('text-success'); ////supp d'un style CSS si déjà présent
        small.classList.add('text-danger'); //ajout d'un style CSS
        return false;
    }
};

const validTel = function(saisieTel){
    // on créé notre regex pour la valid tel
    let telRegExp = new RegExp(
        '^[0-9]{10}$', 'g' // g= utiliser la regex de manière globale
    );
    // on teste si la saisie user est conforme à la regex
    let testTel = telRegExp.test(saisieTel.value);
    let small = saisieTel.nextElementSibling; // attrape la balise small après saisieTel pour la modifier
    if(testTel == true){ // si test est true, on recupere la balise small en-dessous
        small.innerHTML = "Téléphone valide";
        small.classList.remove('text-danger'); //supp d'un style CSS si déjà présent
        small.classList.add('text-success'); //ajout d'un style CSS
        return true;
    }
    else{
        small.innerHTML = "Téléphone non valide";
        small.classList.remove('text-success'); ////supp d'un style CSS si déjà présent
        small.classList.add('text-danger'); //ajout d'un style CSS
        return false;
    }
};