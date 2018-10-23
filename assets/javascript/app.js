// storing display references in variables
var timeDisplay = $("#time-remaining");
var questionDisplay = $("#question");
var optionsDisplay = $("#options");
var startBtn = $("#start-game");

var correctAnswers = 0;
var incorrectAnswers = 0;
var timedOutAnswers = 0;

var beginGame = false;


// reset the game, either at the beginning after clicking "start" or after a completed game
function resetGame() {
    console.log("===================================");
    console.log("game has been reset");
    console.log("===================================");
    // resetting scores
    correctAnswers = 0;
    incorrectAnswers = 0;
    timedOutAnswers = 0;
    // beginGame = true;

    runGame();
};

function runGame() {
    question();
};


// this function will run every time a new question is asked
function question() {
    var timer = 10;
    timeDisplay.text(timer + "s");
    // every second, the timer will decrement
    var intervalId = setInterval(decrement, 1000);

    function decrement() {
        timer--;
        console.log(timer)
        timeDisplay.text(timer + "s");

        if (timer === 0) {
            stop();
            timeDisplay.text("Time's up!");
        }
    }
    function stop() {
        clearInterval(intervalId);
    }

    questionDisplay.text("first question");
    optionsDisplay.text("here are some options");
}


// start the game when the button is clicked
$(document).ready(function() {
    startBtn.on("click", resetGame);

    // if (beginGame === true) {
    //     console.log("beginGame is true");
    //     question();
    // }
})