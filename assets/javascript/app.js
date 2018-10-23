// storing display references in variables
var timeDisplay = $("#time-remaining");
var questionDisplay = $("#question");
var optionsDisplay = $("#options");
var startBtn = $("#start-game");

var beginGame = false;


// reset the game, either at the beginning after clicking "start" or after a completed game
function resetGame() {
    console.log("===================================");
    console.log("game has been reset");
    console.log("===================================");
    // resetting scores
    var correctGuesses = 0;
    var incorrectGuesses = 0;
    var timedOutGuesses = 0;
    beginGame = true;
};


// this function will run every time a new question is asked
function question() {
    console.log("question function is running");
    var timer = 30;
    // every second, the timer will decrement
    var IntervalId = setInterval(decrement, 1000);
    function decrement() {
        timer--;
        console.log(timer)
        timeDisplay.text(timer + "s");
    }

    questionDisplay.text("first question");
    optionsDisplay.text("here are some options");
}

// start the game when the button is clicked
$(document).ready(function() {
    startBtn.on("click", resetGame);

    if (beginGame === true) {
        question();
    }
})