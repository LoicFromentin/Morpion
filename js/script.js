// Les cases vont de 0 a 9.
// Les joueurs jouent a tour de role

var joueur = 1;					// Identifiant du joueur
var win = false;				// Personne n'a gagne
var casesJouees = new Array ();	// Contient les cases deja jouees
var casesJ1 = new Array ();		// Contient les cases jouees par le joueur 1
var casesJ2 = new Array ();		// Contient les cases jouees par le joueur 2
var casesWin = new Array ();	// Contient les cases qui font la victoire
// 7 possibilites de gagner
var casVictoire = new Array (
	new Array(0,1,2),new Array(3,4,5),new Array(6,7,8),
	new Array(0,3,6),new Array(1,4,7),new Array(2,5,8),
	new Array(0,4,8),new Array(2,4,6));

// Place X ou O sur la case qui a subi le clic
function action (numCase) {
	// Si la case n'a pas encore ete jouee
	if(!casesJouees.includes(numCase) && !win) {
		if (joueur==1) {				// Joueur 1 : CROIX
			document.getElementById(numCase).innerHTML = '<img class="signe" src="./img/croix.png">';
			casesJ1.push(numCase);		// Associe la case au joueur
			casesJouees.push(numCase);	// Ajoute la case aux cases jouees
			testWin();					// Test si victoire
			majAffichage();				// Met a jour l'affichage (h2)
			if(!win)joueur = 2;					// Change de joueur
		}
		else {							// Joueur 2 : ROND
			document.getElementById(numCase).innerHTML = '<img class="signe" src="./img/rond.png">';
			casesJ2.push(numCase);		// Associe la case au joueur
			casesJouees.push(numCase);	// Ajoute la case aux cases jouees
			testWin();					// Test si victoire
			majAffichage();				// Met a jour l'affichage (h2)
			if (!win)joueur = 1;					// Change de joueur
		}
		//printConsole();
	}
}

// Retourne vrai si un joueur a gagne
function testWin () {
	var cases = casesJ1;		// Cases controlees par le joueur courant
	if (joueur==2) cases = casesJ2;

	// Boucle les 7 cas de victoire
	for (var i = 0; i < casVictoire.length; i++) {
		// Si le cas de victoire correspond aux cases controlees par le joueur
		if (cases.includes(casVictoire[i][0])&&cases.includes(casVictoire[i][1])&&cases.includes(casVictoire[i][2])) {
			win = true;
			casesWin.push(casVictoire[i][0]);
			casesWin.push(casVictoire[i][1]);
			casesWin.push(casVictoire[i][2]);
		}
	}
}

// Modifie l'affichage (h2) en fonction du joueur
function majAffichage () {
	if (win) {
		document.getElementById("affichage").innerHTML = "Victoire du joueur "+joueur+" !";
		animationVictoire ();
	}
	else if (!win && casesJouees.length==9) {
		document.getElementById("affichage").innerHTML = "Egalite entre les joueurs !";
	}
	else if (joueur==1) {
		document.getElementById("affichage").innerHTML = "Tour du joueur 2";
	}
	else {
		document.getElementById("affichage").innerHTML = "Tour du joueur 1";
	}
}

// Fait clignoter les cases gagnantes
async function animationVictoire () {
	while (true) {
		await sleep (500);
		for (var i = 0; i < casesWin.length; i++) {
			document.getElementById(casesWin[i]).innerHTML = "";
		}
		await sleep (500);
		for (var i = 0; i < casesWin.length; i++) {
			if (joueur==1) {
				document.getElementById(casesWin[i]).innerHTML = '<img class="signe" src="./img/croix.png">';
			}
			else {
				document.getElementById(casesWin[i]).innerHTML = '<img class="signe" src="./img/rond.png">';
			}
		}
		await sleep (1000);
	}
}

// Affiche des infos dans la console
function printConsole () {
	// Test victoire
	console.log("Gagné : "+win);
	// Affiche cases du J2
	var str = "";
	for(var i=0; i<casesJ2.length ; i++) str+= casesJ2[i]+",";
	console.log("Joueur 2 : ["+str+"]");
	// Affiche cases du J1
	str = "";
	for(var i=0; i<casesJ1.length ; i++) str+= casesJ1[i]+",";
	console.log("Joueur 1 : ["+str+"]");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// -------------------- PARTIE IA --------------------
/*
function Noeud (feuille) {
	this.feuille;	// True si la partie est finie ou si pas de fils


}


function calculValeurNoeud (noeud) {
	if (noeud.feuille) return eval(noeud);
	else if (noeud.max) return maximum eval (fils du noeud);
	else if (noeud.min) return minimum eval (fils du noeud);
}

// -1 si IA perd ; 1 si IA gagne ; 0 sinon
function eval () {

}*/