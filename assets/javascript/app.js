// storing display references in variables
var timeDisplay = $("#time-remaining");
var questionDisplay = $("#question");
var option1 = $("#option1");
var option2 = $("#option2");
var option3 = $("#option3");
var option4 = $("#option4");
var startBtn = $("#start-game");
var correctDisplay = $("#correct-answers");
var incorrectDisplay = $("#incorrect-answers");
var timedOutDisplay = $("#timed-out-answers");


var correctAnswers = 0;
var incorrectAnswers = 0;
var timedOutAnswers = 0;
var qcount = 0;


// defining questions as objects
var q1 = {
    question: "here's the first question",
    correct: "option1",
    ans1: "1-1",
    ans2: "1-2",
    ans3: "1-3",
    ans4: "1-4",
}
var q2= {
    question: "here's the second question",
    correct: "option3",
    ans1: "2-1",
    ans2: "2-2",
    ans3: "2-3",
    ans4: "2-4",
}

// array of questions to cycle through
var qArray = [q1, q2];


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
    qcount = 0;

    runGame(() => console.log("finished running the game"));
};

// keeps the game running in between questions
async function runGame() {
    qcount = 0;

    // cycling through the array of questions
    // for (var i = 0; i < 2; i++) {
    //     console.log("question #" + (i+1));
    //     await question(qArray[i]);

    //     if (qcount === 2) {
    //         // endGame;
    //         console.log("game over!");
    //     }
    // }

    for (const i of qArray) {
        console.log("question #" + qcount);
        await question(i);

        if (qcount === 2) {
            // endGame;
            console.log("game over!");
        }
    }

    // qArray.forEach(i => {
    //     var qAnswered = false;
    //     qcount++;
    //     console.log("question #" + qcount);
    //     await question(i);

    //     if (qcount === 2) {
    //         // endGame;
    //         console.log("game over!");
    //     }
    // });
};

function endGame() {
    console.log("game over!");
    questionDisplay.text("");
    option1.text("");
    option2.text("");
    option3.text("");
    option4.text("");

    correctDisplay.text(correctAnswers);
    incorrectDisplay.text(incorrectAnswers);
    timedOutDisplay.text(timedOutAnswers);
}


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
            timedOutAnswers++;
            qAnswered = true;
            // qcount++;
            // console.log("qcount: " + qcount);
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
            correctAnswers++;
            qAnswered = true;
            // qcount++;
            // console.log("qcount: " + qcount);
        } else {
            console.log("wrong answer!");
            incorrectAnswers++;
            qAnswered = true;
            // qcount++;
            // console.log("qcount: " + qcount);
        }
    });
};



// start the game when the button is clicked
$(document).ready(function() {
    startBtn.on("click", resetGame);
})