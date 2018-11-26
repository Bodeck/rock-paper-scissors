var playerTotal = 0;
var computerTotal = 0;
var scoreMaximum = 10;

var playerMove = function(playerMove){
    var computerMove = computerMove();
    var playerScore = 0;
    var computerScore = 0;
    var roundResult;
    if (playerMove === computerMove){
        roundResult = 'remis'
    }
    
    displayResults(playerScore, computerScore, roundResult);
}

var computerMove = function() {
    var rdmNum = Math.ceil(Math.random() * 3);
    if (rdmNum === 1) {
        return 'paper'    
    } else if (rdmNum === 2) {
        return 'scissors'
    } else {
        return 'rock' 
    }
    
}

var displayScores = function(playerScore, computerScore, result) { 
    var output = document.getElementById('output');
    
}
