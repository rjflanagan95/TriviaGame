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
    ans1: {
        answer: "answer 1",
        value: true,
    },
    ans2: {
        answer: "answer 2",
        value: false,
    },
    ans3: {
        answer: "answer 3",
        value: false,
    },
    ans4: {
        answer: "answer 4",
        value: false,
    }
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
    option1.append(qNumber.ans1.answer);
    option2.append(qNumber.ans2.answer);
    option3.append(qNumber.ans3.answer);
    option4.append(qNumber.ans4.answer);
}


// start the game when the button is clicked
$(document).ready(function() {
    startBtn.on("click", resetGame);
})