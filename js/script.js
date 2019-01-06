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

var modalCloseBtns = document.querySelectorAll('.close');
var playerButtons = document.querySelectorAll('.player-move');
var modalOverlay = document.querySelector('.modal-overlay');
var modals = document.querySelectorAll('.modal');

setDefaults();

playerButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        var move = event.currentTarget.getAttribute('data-user-move');
        //alternative: var move = event.currentTarget.dataset.userMove;
        playerMove(move);
    });
})

modalCloseBtns.forEach(function(btn){
    btn.addEventListener('click', closeModal);
})

modalOverlay.addEventListener('click', closeModal);

modals.forEach(function(modal) {
    modal.addEventListener('click', function(event) {
        event.stopPropagation();
    })
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
    var modal = document.querySelector('#game-results');
    var msg = params.playerScores > params.computerScores ? 'You won the entire game!' : 'You lost entire game!';
    modal.querySelector('header').textContent = msg;
    modal.classList.add('display');
    modal.parentElement.classList.add('display');
}

function setDefaults() {
    displayScores();
    maxScoreDisp.textContent = params.maxScores;
    output.textContent = 'Click one of buttons to start game';
}

function closeModal() {
    var overlay = document.querySelector('.modal-overlay')
    overlay.classList.remove('display');
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.classList.remove('display');
    })
}
newGameBtn.addEventListener('click', startGame);