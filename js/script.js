'use strict'

var computerScores = 0;
var scoreMaximum = 10;
var playerScores = 0;
var rockBtn = document.getElementById('rock');
var paperBtn = document.getElementById('paper');
var scissorsBtn = document.getElementById('scissors');


var playerMove = function () {
    var playerMove = this.id;
    var roundResult;
    var computerMove = getComputerMove();
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
    var output = document.getElementById('output');
    
    output.textContent = result.toUpperCase() + ':'
        + ' You played ' + playerMove.toUpperCase()
        + ', computer played '
        + computerMove.toUpperCase();
}

paperBtn.addEventListener('click', playerMove);
rockBtn.addEventListener('click', playerMove);
scissorsBtn.addEventListener('click', playerMove);