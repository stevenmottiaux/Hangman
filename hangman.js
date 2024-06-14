const words = ["PENDU", "JAVASCRIPT", "HTML", "CSS", "PROGRAMMATION"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let splittedWord = selectedWord.split('')
let guessedLetters = [''];
let wrongAttempts = 0;

const wordContainer = document.getElementById('word-container');
let restartButton = document.getElementById('restart-button');
const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const letterButtonsContainer = document.getElementById('letter-buttons');
letterButtonsContainer.innerHTML = '';
let buttonsHTML = '';
let startButton = document.getElementById('start-button');

document.getElementById('start-button').addEventListener('click', function() {
    
function initGame() {
    guessedLetters = [];
    wrongAttempts = 0;
    selectedWord = words[Math.floor(Math.random() * words.length)];
    splittedWord = selectedWord.split('')
    console.log(splittedWord);
    createLetterButtons();
    hideStartButton();
    showRestartButton();
}


function createLetterButtons () {
    buttonsHTML = '';
    for (i=0; i < letters.length; i++) {
        buttonsHTML += `<button id="letter-${letters[i]}">${letters[i]}</button>`
    }  
    letterButtonsContainer.innerHTML = buttonsHTML;
    letters.forEach(letter => {
        let button = document.getElementById(`letter-${letter}`)
        button.addEventListener('click', function() {
            checkLetter(letter);
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



initGame();

});

function checkLetter(letter){
    if(splittedWord.includes(letter)){
        let index = splittedWord.indexOf(letter)
        console.log(index);
        guessedLetters[index] = letter;
        console.log(guessedLetters)
        wordContainer.innerText = guessedLetters.join('');
    }

    else {
        wrongAttempts += 1
    }
}

