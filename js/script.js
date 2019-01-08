'use strict'

var resultsDisp = document.getElementById('message');
var newGameBtn = document.getElementById('new-game');
var maxScoreDisp = document.getElementById('max-scores-output');
var playScoresDisp = document.getElementById('player-scores-output');
var compScoresDisp = document.getElementById('comp-scores-output');


var params = {
    playerScores: 0,
    computerScores: 0,
    maxScores: 10,
    roundsCount: 0,
    progress: [],
    playerName: 'Player'
}

var modalCloseBtns = document.querySelectorAll('.close');
var playerButtons = document.querySelectorAll('.player-move');
var modalOverlay = document.querySelector('.modal-overlay');
var modals = document.querySelectorAll('.modal');
var startGameBtn = document.querySelector('#start-game');
setDefaults();

newGameBtn.addEventListener('click', function(){
    displayModal("#new-game-modal")
});

startGameBtn.addEventListener('click', startGame);

playerButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        var move = event.currentTarget.dataset.userMove;
        //alternative: var move = event.currentTarget.getAttribute('data-user-move');
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
    var msgText = round.roundResult + ': '; 
    msgText += params.playerName + ' played ' + round.move + ', ';
    msgText +=  'computer played ' + round.computerMove;
    resultsDisp.innerText = msgText;
}

function checkRoundResults(userMove, computerMove) {
    var roundResult;
    if (userMove === computerMove) {
        roundResult = 'Draw';
    }
    else if (userMove === 'rock' && computerMove === 'scissors' ||
        userMove === 'paper' && computerMove === 'rock' ||
        userMove === 'scissors' && computerMove === 'paper') {
        roundResult = params.playerName + ' won';
        params.playerScores++;
    }
    else {
        roundResult = params.playerName + ' lost';
        params.computerScores++;
    }
    return roundResult;
}

function displayScores() {
    playScoresDisp.innerText = params.playerScores;
    compScoresDisp.innerText = params.computerScores;
}

function startGame() {
    var maxScoresInput = document.querySelector('input#max-scores');
    var playerNameInput = document.querySelector('input#player-name');
    params.maxScores = parseInt(maxScoresInput.value);
    params.playerName = playerNameInput.value;
    closeModal('#max-scores');
    clearTable('#scores-table tbody');
    setDefaults();
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
    resultsDisp.textContent = 'Click one of buttons to start game';
}

function clearTable(selector) {
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

