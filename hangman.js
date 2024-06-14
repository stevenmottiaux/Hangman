const gameContainer = document.getElementById('game-container');
const words = ["PENDU", "JAVASCRIPT", "HTML", "CSS", "PROGRAMMATION"];
const gameOver = 'Vous avez perdu !'
let selectedWord = words[Math.floor(Math.random() * words.length)];
let splittedWord = selectedWord.split('')
let guessedLetters = Array(selectedWord.length).fill('_');
let wrongAttempts = 0;


const wordContainer = document.getElementById('word-container');
let restartButton = document.getElementById('restart-button');
const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const letterButtonsContainer = document.getElementById('letter-buttons');
letterButtonsContainer.innerHTML = '';
let buttonsHTML = '';
let startButton = document.getElementById('start-button');
const hangmanDrawing = document.getElementById('hangman-drawing');

function initGame() {
    guessedLetters = Array(selectedWord.length).fill('_');
    guessedLetters = [];
    wrongAttempts = 0;
    selectedWord = words[Math.floor(Math.random() * words.length)];
    splittedWord = selectedWord.split('')
    console.log(splittedWord);
    createLetterButtons();
    hideStartButton();
    showRestartButton();
    updateWordContainer();
}

function initGameWithoutButton() {
    guessedLetters = Array(selectedWord.length).fill('_');
    guessedLetters = [];
    wrongAttempts = 0;
    selectedWord = words[Math.floor(Math.random() * words.length)];
    splittedWord = selectedWord.split('')
    console.log(splittedWord);
    updateWordContainer();
    createLetterButtons();
}

function createLetterButtons () {
    let buttonsHTML = '';
    for (i=0; i < letters.length; i++) {
        buttonsHTML += `<button id="letter-${letters[i]}">${letters[i]}</button>`
    }  
    letterButtonsContainer.innerHTML = buttonsHTML;
    letters.forEach(letter => {
        let button = document.getElementById(`letter-${letter}`)
        button.addEventListener('click', function() {
            checkLetter(letter);
            stopGame();
        })
    })
}


function hideStartButton (){
    if (getComputedStyle(startButton).display === "inline-block"){
        startButton.style.display = "none";
    }

    else {
        startButton.style.display = "inline-block";
    }
}

function showRestartButton (){
    if (getComputedStyle(restartButton).display === "none"){
        restartButton.style.display = "inline-block";
    }

    else {
        restartButton.style.display = "none";
    }
}



function updateWordContainer() {
    wordContainer.innerHTML = ''; // Clear the container
    for (let i = 0; i < splittedWord.length; i++) {
        let span = document.createElement('span');
        span.classList.add('letter');
        if (guessedLetters[i]) {
            span.textContent = guessedLetters[i];
            span.classList.add('guessed');
        }
        else {
            span.textContent = '_';
        }
        wordContainer.appendChild(span);
    }
}

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
        updateWordContainer();
    } 

    else {
        wrongAttempts += 1;
        console.log(wrongAttempts)
        // Gérer les tentatives incorrectes ici si nécessaire
    }
}

function stopGame () {
    if (wrongAttempts >= 5) {
        gameContainer.innerText = gameOver;
    }
}



document.getElementById('start-button').addEventListener('click', function() {
buttonsHTML = '';
initGame();

});

document.getElementById('restart-button').addEventListener('click', function() { // Ajoute un écouteur d'évenement au bouton "recommencer"
    buttonsHTML = '';
    hangmanDrawing.innerHTML = '';
    wordContainer.innerHTML = '';
    letterButtonsContainer.innerHTML = '';

    // Reinitialize the game
    initGame();
});
