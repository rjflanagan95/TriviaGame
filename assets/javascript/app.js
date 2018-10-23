// storing display references in variables
var timeDisplay = $("#time-remaining");
var questionDisplay = $("#question");
var option1 = $("#option1");
var option2 = $("#option2");
var option3 = $("#option3");
var option4 = $("#option4");
var startBtn = $("#start-game");

var correctAnswers = 0;
var incorrectAnswers = 0;
var timedOutAnswers = 0;

var beginGame = false;

// defining questions as objects
var q1 = {
    question: "here's the first question",
    correct: "option1",
    ans1: "answer 1",
    ans2: "answer 2",
    ans3: "answer 3",
    ans4: "answer 4",
}

// array of questions to cycle through
var qArray = [q1];


// reset the game, either at the beginning after clicking "start" or after a completed game
function resetGame() {
    startBtn.text("");
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
    for (var i = 0; i < 1; i++) {
        question(qArray[i])
    }
};


// this function will run every time a new question is asked
function question(qNumber) {
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

    // displaying the question and possible answers
    questionDisplay.text(qNumber.question);
    option1.text(qNumber.ans1);
    option2.text(qNumber.ans2);
    option3.text(qNumber.ans3);
    option4.text(qNumber.ans4);

    $(".answer-button").on("click", function() {
        stop();
        // the id of the option div is compared to the correct answer listed in the question object
        if (this.id === qNumber.correct) {
            console.log("right answer!");
        } else {
            console.log("wrong answer!");
        }
    });
};



// start the game when the button is clicked
$(document).ready(function() {
    startBtn.on("click", resetGame);
})