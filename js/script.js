'use strict'

var computerScores = 0;
var playerScores = 0;
var maxScores = 10;
var output = document.getElementById('output');
var scores = document.getElementById('scores');
var newGameBtn = document.getElementById('new-game');
var maxScoreDisp = document.getElementById('max-scores');

setDefaults();
var playerButtons = document.querySelectorAll('.player-move');
playerButtons.forEach(function (button) {
    button.addEventListener('click', function(event){
        var move = event.currentTarget.getAttribute('data-user-move');
        //alternative: var move = event.currentTarget.dataset.userMove;
        playerMove(move);
    });
})
function playerMove(move) {
    var roundResult;
    var computerMove;
    if (playerScores === maxScores || computerScores === maxScores) {
        finishGame();
    } else {
        computerMove = getComputerMove();
        roundResult = checkRoundResults(move, computerMove);
        displayResults(move, computerMove, roundResult);
        displayScores();
    }
}

function getComputerMove() {
    return ['paper', 'scissors', 'rock'][parseInt(Math.random() * 3)];
}

function displayResults(userMove, computerMove, result) {
    output.innerHTML = '<span>' + result + '</span> :'
        + '  You played <span>' + userMove + '</span>'
        + ', computer played '
        + '<span>' + computerMove + '</span>';
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
    // output.innerHTML += playerScores > computerScores ? '<p> You won the entire game! </p>' : '<p> You lost entire game! </p>';
    var par = document.createElement('p');
    par.innerText = playerScores > computerScores ? 'You won the entire game!' : 'You lost entire game!';
    output.append(par);
}

function setDefaults() {
    displayScores();
    maxScoreDisp.textContent = maxScores;
    output.textContent = 'Click one of buttons to start game';
}

newGameBtn.addEventListener('click', startGame);