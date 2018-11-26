'use strict'

var computerScores = 0;
var maxScores = 10;
var playerScores = 0;
var output = document.getElementById('output');
var scores = document.getElementById('scores');
var rockBtn = document.getElementById('rock');
var paperBtn = document.getElementById('paper');
var scissorsBtn = document.getElementById('scissors');
var newGameBtn = document.getElementById('new-game');
var maxScoreDisp = document.getElementById('max-scores');

var playerMove = function () {
    var playerMove = this.id;
    var roundResult;
    var computerMove = getComputerMove();

    if (playerScores === maxScores || computerScores === maxScores) {
        finishGame();
    } else {
        if (playerMove === computerMove) {
            roundResult = 'draw';
        } else if (playerMove === 'rock' && computerMove === 'scissors' ||
            playerMove === 'paper' && computerMove === 'rock' ||
            playerMove === 'scissors' && computerMove === 'paper') {
            roundResult = 'You won';
            playerScores++;
        } else {
            roundResult = 'You lost';
            computerScores++;
        }
        displayResults(playerMove, computerMove, roundResult);
    }
}

var getComputerMove = function () {
    var rdmNum = Math.ceil(Math.random() * 3);
    if (rdmNum === 1) {
        return 'paper'
    } else if (rdmNum === 2) {
        return 'scissors'
    } else {
        return 'rock'
    }

}

var displayResults = function (playerMove, computerMove, result) {
    output.textContent = result.toUpperCase() + ':'
        + ' You played ' + playerMove.toUpperCase()
        + ', computer played '
        + computerMove.toUpperCase();
    scores.textContent = playerScores + '-' + computerScores;
}

function startGame() {
    playerScores = 0;
    computerScores = 0;
    maxScores = parseInt(window.prompt('Enter number of credits...'));
    maxScores = isNaN(maxScores) ? 10 : maxScores;
    maxScoreDisp.textContent = maxScores;
    scores.textContent = playerScores + ' - ' + computerScores;
    output.textContent = '';
}

function finishGame() {
    output.innerHTML += playerScores > computerScores ? '<br> You won the entire game!' : '<br> You lost entire game!'
}

paperBtn.addEventListener('click', playerMove);
rockBtn.addEventListener('click', playerMove);
scissorsBtn.addEventListener('click', playerMove);
newGameBtn.addEventListener('click', startGame);