document.addEventListener('DOMContentLoaded', function () {
    let gameContainer = document.getElementById('game-container');
    const words = [
        "PENDU",
        "JAVASCRIPT",
        "HTML",
        "CSS",
        "PROGRAMMATION",
        "PYTHON",
        "JAVA",
        "REACT",
        "ANGULAR",
        "NODEJS",
        "MYSQL",
        "MONGODB",
        "DOCKER",
        "GIT",
        "API",
        "WEBPACK"
    ];
    let selectedWord = ''; // Etabli une variable et y ajoute un mot au hasard du tableau 'words'
    let splittedWord = selectedWord.split('') // Divise le mot choisi précédemment en lettres et crée un nouveau tableau avec celles-ci
    let guessedLetters = Array(selectedWord.length).fill(''); // Crée une variable qui doit contenir les lettres devinées. De base, celle-ci est remplie avec un tableau conteant autant de caractères vides que ce que contient le mot aléatoire choisi.
    let wrongAttempts = 0; // Crée une variable pour le nombres de mauvaises tentatives et la met à 0 de base.



    let restartButton = document.getElementById('restart-button');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let buttonsHTML = '';
    let startButton = document.getElementById('start-button');

    // Etabli une fonction qui relance le jeu une fois que celui-ci a déjà été lancé une fois. Cette fonction est appelée plus tard dans un écouteur d'évenement lié au bouton "recommencer"  
    function initGameWithoutButton() {

        // Reset les variables du jeu 
        guessedLetters = [],
        wrongAttempts = 0;
        selectedWord = words[Math.floor(Math.random() * words.length)];
        splittedWord = selectedWord.split('');

        // Ajouter les nouvelles divs au game container avec un léger délai
        setTimeout(function () {
            gameContainer.innerHTML = `
                <div id="hangman-drawing"></div>
                <div id="word-container"></div>
                <div id="letter-buttons"></div>
            `;
            // Met à jour le conteneur "word-container" en faisant appel à la fonction updateWordContainer
            updateWordContainer();
            // Supprime et recrée tous les bouttons en faisant appel à la fonction createLetterButtons
            createLetterButtons();
        }); 
    }

    // Même fonction que initGameWithoutButton mais n'est utilisée qu'une seule fois, lors du premier lancement du jeu avec le bouton "Commencer". Elle est appelée dans l'écouteur d'évenements lié au bouton "commencer"
    function initGame() {
        guessedLetters = Array(selectedWord.length).fill('');
        wrongAttempts = 0;
        selectedWord = words[Math.floor(Math.random() * words.length)];
        splittedWord = selectedWord.split('')
        console.log(splittedWord);
        createLetterButtons();
        hideStartButton();
        showRestartButton();
        updateWordContainer();
    }

 //Crée une fonction qui va checker chaque lettre cliquée sur le "clavier" affiché sur la page
    function checkLetter(letter) {
        let found = false;

        // Parcourir splittedWord pour trouver toutes les occurrences de la lettre
        for (let i = 0; i < splittedWord.length; i++) {
            if (splittedWord[i] === letter) {
                guessedLetters[i] = letter; // Ajouter la lettre à guessedLetters à l'index correspondant
                found = true;
            }
        }

        if (found) {
            updateWordContainer(); // Ajoute la lettre correcte trouvée au conteneur word-container grâce à l'appel de fonction
        }

        else {
            wrongAttempts += 1; // Ajout 1 à la variable wrongAttempts qui sert à déclencher le gameover quand elle est plus grande ou égale à 7
            drawHangman(); // Appeler la fonction pour dessiner le pendu
        }


    }
// Crée une fonction qui a pour but de stopper le jeu quand un nombre de mauvais choix a été atteint ou si le mot a été trouvé
    function stopGame() {
        if (wrongAttempts >= 7) { // Si la valeur de la variable arrive à 7, le conteneur qui contient le jeu est remplacé par le texte.
            gameContainer.innerText = "Vous avez perdu !";
        }

        else if (splittedWord.length === guessedLetters.length) // Si la longueur du tableau qui contient le mot divisé en lettre est égale à la longueur du tableau contenant les lettres devinées (correctes), le conteneur qui contient le jeu est remplacé par le texte. 
            gameContainer.innerText = "Vous avez gagné !";
    };


 // Crée une fonction qui va créer l'ensemble des bouttons nécessaires au jeu   
    function createLetterButtons() {
        let letterButtonsContainer = document.getElementById('letter-buttons'); // Obtient la référence du conteneur dans lequel vont être envoyés les bouttons
        letterButtonsContainer.innerHTML = ''; // Assure que les boutons d'une partie précédente sont bine éffacés avant de vouloir y ajouter des nouveaux.
        letters.forEach(letter => { // Fonction qui va crée un boutton pour chaque lettre présente dans le tableau "letters".
            let button = document.createElement('button');
            button.textContent = letter; // Ajoute comme contenu du bouton crée la lettre correspondante.
            button.id = `letter-${letter}`; // Ajoute un ID a chaque bouton crée (letter-...).
            button.addEventListener('click', function () {
                checkLetter(letter);
                button.disabled = true;
                stopGame();
            });
            letterButtonsContainer.appendChild(button);
        });
        console.log(letterButtonsContainer.innerHTML);
    }

    function hideStartButton() {
        if (getComputedStyle(startButton).display === "inline-block") {
            startButton.style.display = "none";
        }

        else {
            startButton.style.display = "inline-block";
        }
    }

    function showRestartButton() {
        if (getComputedStyle(restartButton).display === "none") {
            restartButton.style.display = "inline-block";
        }
    }

    function drawHangman() {
        let hangmanDrawing = document.getElementById('hangman-drawing');
        // Exemple : Ajouter un élément différent à chaque étape
        switch (wrongAttempts) {
            case 1:
                hangmanDrawing.innerHTML = '<div class="head"></div>';
                break;
            case 2:
                hangmanDrawing.innerHTML += '<div class="body"></div>';
                break;
            case 3:
                hangmanDrawing.innerHTML += '<div class="left-arm"></div>';
                break;
            case 4:
                hangmanDrawing.innerHTML += '<div class="right-arm"></div>';
                break;
            case 5:
                hangmanDrawing.innerHTML += '<div class="left-leg"></div>';
                break;
            case 6:
                hangmanDrawing.innerHTML += '<div class="right-leg"></div>';
                break;
            default:
                break;
        }
    }



    function updateWordContainer() {
        let wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = ''; // Clear the container
        for (let i = 0; i < splittedWord.length; i++) {
            let span = document.createElement('span');
            span.classList.add('letter');
            if (guessedLetters[i]) {
                span.textContent = guessedLetters[i];
                span.classList.add('guessed');
            }
            else {
                span.textContent = '';
            }
            wordContainer.appendChild(span);
        }
    }

    restartButton.addEventListener('click', function () {
        initGameWithoutButton();
    });


    document.getElementById('start-button').addEventListener('click', function () {
        initGame();

    });
});