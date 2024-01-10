let scoreJoueur = 0;
let scoreOrdinateur = 0;
const choix = ["pierre", "papier", "ciseaux"];
let scoreMax = 5; // Score maximum initial
const np=document.getElementById("nouvellePartie");
np.style.display="none";

function changerScoreMax() {
    // Met à jour le score maximum en fonction de la sélection du joueur
    scoreMax = parseInt(document.getElementById("scoreMaxSelect").value); //parseInt pour récupérer sous forme de valeur
    nouvellePartie(); // Commence une nouvelle partie avec le nouveau score maximum
    document.getElementById("choixscore-container").style.display="none"; //masque le sélecteur de choix
}
function choixOrdinateur() {
    const indexAleatoire = Math.floor(Math.random() * 3); //choix de l'ordinateur par un indice
    return choix[indexAleatoire];
}

function determinerGagnant(joueur, ordinateur) {
    if (joueur === ordinateur) return "Égalité !";
    if (
        (joueur === "pierre" && ordinateur === "ciseaux") ||
        (joueur === "papier" && ordinateur === "pierre") ||
        (joueur === "ciseaux" && ordinateur === "papier")
    ) {
        scoreJoueur++;
        return "Vous avez gagné !";
    } else {
        scoreOrdinateur++;
        return "L'ordinateur a gagné.";
    }
}

function mettreAJourScores() {
    document.getElementById("player-score").textContent = `Joueur: ${scoreJoueur}`;
    document.getElementById("computer-score").textContent = `Ordinateur: ${scoreOrdinateur}`;
}

function jouerAnimationChoixOrdinateur(choixOrdinateurResultat) {
    const ordinateurIcon = document.getElementById("ordinateur-icon");

    switch (choixOrdinateurResultat) {
        case "pierre":
            ordinateurIcon.innerHTML = '<i class="fas fa-hand-rock"></i>';
            break;
        case "papier":
            ordinateurIcon.innerHTML = '<i class="fas fa-hand-paper"></i>';
            break;
        case "ciseaux":
            ordinateurIcon.innerHTML = '<i class="fas fa-hand-scissors"></i>';
            break;
      
    }

    ordinateurIcon.classList.add("animate__animated", "animate__fadeIn");

    // Assurons-nous de supprimer la classe après l'animation pour la prochaine itération
    setTimeout(() => {
        ordinateurIcon.classList.remove("animate__animated", "animate__fadeIn");
    }, 1000); 
}

function playerChoice(choixJoueur) {
    const choixOrdinateurResultat = choixOrdinateur();

    const resultat = determinerGagnant(choixJoueur, choixOrdinateurResultat);
    document.getElementById("result").innerHTML = `Vous avez choisi ${choixJoueur}. L'ordinateur a fait son choix. L'ordinateur a choisi <span id="ordinateur-icon"></span>. ${resultat}`;

    jouerAnimationChoixOrdinateur(choixOrdinateurResultat);
    mettreAJourScores();
    // Vérifions si l'un des joueurs a atteint le score maximum
    if (scoreJoueur === scoreMax || scoreOrdinateur === scoreMax) {
        finDePartie();
    }
}

function finDePartie() {
    // Affiche un message de fin de partie
    let messageFin = (scoreJoueur === scoreMax) ? "Félicitations ! Vous avez gagné !" : "Dommage, l'ordinateur a gagné.";
    document.getElementById("result").innerHTML = `${messageFin} La partie est terminée.`;
    document.getElementById("choices").style.display="none";
    np.style.display="initial";  
}

function nouvellePartie() {
    // Réinitialise les scores et le message
    scoreJoueur = 0;
    scoreOrdinateur = 0;
    document.getElementById("result").textContent = "Choisissez";
    document.getElementById("choixscore-container").style.display="initial";
    document.getElementById("choices").style.display="block";
    np.style.display="none";
    // Mise à jour des scores
    mettreAJourScores(); 
}