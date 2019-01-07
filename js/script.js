'use strict'

var output = document.getElementById('output');
var scores = document.getElementById('scores');
var newGameBtn = document.getElementById('new-game');
var maxScoreDisp = document.getElementById('max-scores');

var params = {
    playerScores: 0,
    computerScores: 0,
    maxScores: 10,
    roundsCount: 0,
    progress: []
}

var modalCloseBtns = document.querySelectorAll('.close');
var playerButtons = document.querySelectorAll('.player-move');
var modalOverlay = document.querySelector('.modal-overlay');
var modals = document.querySelectorAll('.modal');
var startGameBtn = document.querySelector('#start-game');
setDefaults();

// newGameBtn.addEventListener('click', startGame);
newGameBtn.addEventListener('click', function(){
    displayModal("#new-game-modal")
});

startGameBtn.addEventListener('click', startGame);

playerButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        var move = event.currentTarget.getAttribute('data-user-move');
        //alternative: var move = event.currentTarget.dataset.userMove;
        playerMove(move);
    });
})

modalCloseBtns.forEach(function (btn) {
    btn.addEventListener('click', closeModal);
})

modalOverlay.addEventListener('click', closeModal);

modals.forEach(function (modal) {
    modal.addEventListener('click', function (event) {
        event.stopPropagation();
    })
})

function playerMove(move) {
    var round = {
        roundNum: 0,
        move: '',
        computerMove: '',
        roundResult: '',
        gameScores: ''
    }
    if (params.playerScores === params.maxScores || params.computerScores === params.maxScores) {
        finishGame();
    } else {
        round.move = move;
        round.computerMove = getComputerMove();
        round.roundResult = checkRoundResults(round.move, round.computerMove);
        displayResults(round);
        displayScores();
        params.roundsCount++;
        round.roundNum = params.roundsCount;
        round.gameScores = params.playerScores + '-' + params.computerScores;
        params.progress.push(round);
    }
}

function getComputerMove() {
    return ['paper', 'scissors', 'rock'][parseInt(Math.random() * 3)];
}

function displayResults(round) {
    output.innerHTML = '<span>' + round.roundResult + '</span> :'
        + '  You played <span>' + round.move + '</span>'
        + ', computer played '
        + '<span>' + round.computerMove + '</span>';
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
    var maxScoresInput = document.querySelector('#max-scores');
    var playerNameInput = document.querySelector('#player-name');
    params.maxScores = isNaN(maxScoresInput.value) ? 10 : maxScoresInput.value;
    removeTable('#scores-table tbody');
    setDefaults();
    closeModal('#max-scores');
}

function finishGame() {
    var modal = document.querySelector('#game-results');
    if (!modal.querySelector('tbody')) {
        var msg = params.playerScores > params.computerScores ? 'You won the entire game!' : 'You lost entire game!';
        modal.querySelector('header').textContent = msg;
        var table = modal.querySelector('#scores-table')
        var tableBody = populateTable(params.progress);
        table.append(tableBody);
    }
    displayModal('#game-results');
}

function setDefaults() {
    params.playerScores = 0;
    params.computerScores = 0;
    params.progress = [];
    params.roundsCount = 0,
    displayScores();
    maxScoreDisp.textContent = params.maxScores;
    output.textContent = 'Click one of buttons to start game';
}

function removeTable(selector) {
    var el = document.querySelector(selector);
    if(el) {
        el.remove();
    }
}
function populateTable(dataArr) {
    var tbl = document.createElement('tbody');
    dataArr.forEach(function (round) {
        var tblRow = document.createElement('tr');
        for (var prop in round) {
            var tData = document.createElement('td');
            tData.innerText = round[prop];
            tblRow.appendChild(tData);
        }
        tbl.appendChild(tblRow);
    })
    return tbl
}

function closeModal() {
    var overlay = document.querySelector('.modal-overlay')
    overlay.classList.remove('display');
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        modal.classList.remove('display');
    })
}

function displayModal(modId) {
    var modal = document.querySelector(modId);
    modal.parentElement.classList.add('display');
    modal.classList.add('display');
}

