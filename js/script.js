'use strict'

var output = document.getElementById('output');
var scores = document.getElementById('scores');
var newGameBtn = document.getElementById('new-game');
var maxScoreDisp = document.getElementById('max-scores');

var params = {
    playerScores: 0,
    computerScores: 0,
    maxScores: 10,
    roundsCount: 0
}


setDefaults();
var playerButtons = document.querySelectorAll('.player-move');
playerButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        var move = event.currentTarget.getAttribute('data-user-move');
        //alternative: var move = event.currentTarget.dataset.userMove;
        playerMove(move);
    });
})
function playerMove(move) {
    var roundResult;
    var computerMove;
    if (params.playerScores === params.maxScores || params.computerScores === params.maxScores) {
        finishGame();
    } else {
        computerMove = getComputerMove();
        roundResult = checkRoundResults(move, computerMove);
        displayResults(move, computerMove, roundResult);
        displayScores();
        params.roundsCount++;
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
        params.playerScores++;
    }
    else {
        roundResult = 'You lost';
        params.computerScores++;
    }
    return roundResult;
}

function displayScores() {
    scores.textContent = params.playerScores + '-' + params.computerScores;
}

function startGame() {
    params.playerScores = 0;
    params.computerScores = 0;
    var maxScores = parseInt(window.prompt('Enter number of credits...'));
    params.maxScores = isNaN(maxScores) ? 10 : maxScores;
    setDefaults();
}

function finishGame() {
    // output.innerHTML += playerScores > computerScores ? '<p> You won the entire game! </p>' : '<p> You lost entire game! </p>';
    var par = document.createElement('p');
    par.innerText = params.playerScores > params.computerScores ? 'You won the entire game!' : 'You lost entire game!';
    output.append(par);
}

function setDefaults() {
    displayScores();
    maxScoreDisp.textContent = params.maxScores;
    output.textContent = 'Click one of buttons to start game';
}

newGameBtn.addEventListener('click', startGame);