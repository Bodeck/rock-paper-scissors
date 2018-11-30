'use strict'

var computerScores = 0;
var playerScores = 0;
var maxScores = 10;
var output = document.getElementById('output');
var scores = document.getElementById('scores');
var rockBtn = document.getElementById('rock');
var paperBtn = document.getElementById('paper');
var scissorsBtn = document.getElementById('scissors');
var newGameBtn = document.getElementById('new-game');
var maxScoreDisp = document.getElementById('max-scores');

setDefaults();

function playerMove(event) {
    var userMove;
    var roundResult;
    var computerMove;

    if (playerScores === maxScores || computerScores === maxScores) {
        finishGame();
    } else {
        userMove = event.currentTarget.dataset.userMove;
        computerMove = getComputerMove();
        roundResult = checkRoundResults(userMove, computerMove);
        displayResults(userMove, computerMove, roundResult);
        displayScores();
    }
}

function getComputerMove() {
    return ['paper','scissors','rock'][parseInt(Math.random() * 3)];
}

function displayResults(userMove, computerMove, result) {
    output.textContent = result.toUpperCase() + ':'
        + ' You played ' + userMove.toUpperCase()
        + ', computer played '
        + computerMove.toUpperCase();
}

function checkRoundResults(userMove, computerMove) {
    var roundResult;
    if (userMove === computerMove) {
        roundResult = 'draw';
    }
    else if (userMove === 'rock' && computerMove === 'scissors' ||
        userMove === 'paper' && computerMove === 'rock' ||
        userMove === 'scissors' && computerMove === 'paper') {
        roundResult = 'You won';
        playerScores++;
    }
    else {
        roundResult = 'You lost';
        computerScores++;
    }
    return roundResult;
}

function displayScores() {
    scores.textContent = playerScores + '-' + computerScores;
}

function startGame() {
    playerScores = 0;
    computerScores = 0;
    maxScores = parseInt(window.prompt('Enter number of credits...'));
    maxScores = isNaN(maxScores) ? 10 : maxScores;
    setDefaults();
}

function finishGame() {
    output.innerHTML += playerScores > computerScores ? '<br> You won the entire game!' : '<br> You lost entire game!'
}

function setDefaults () {
    displayScores();
    maxScoreDisp.textContent = maxScores;
    output.textContent = 'Click one of buttons to start game';
}

paperBtn.addEventListener('click', playerMove);
rockBtn.addEventListener('click', playerMove);
scissorsBtn.addEventListener('click', playerMove);
newGameBtn.addEventListener('click', startGame);