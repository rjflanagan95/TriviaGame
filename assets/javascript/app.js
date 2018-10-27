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

// creating variables for game stats
var correctAnswers = 0;
var incorrectAnswers = 0;
var timedOutAnswers = 0;
var qcount = 0;

// this interval tracks the timer on the page
var intervalId;
// this interval tracks the actual time for the question
var qInterval;


// defining questions as objects
var q1 = {
    question: "here's the first question",
    correct: "option1",
    ans1: "1-1 (correct)",
    ans2: "1-2",
    ans3: "1-3",
    ans4: "1-4",
}
var q2 = {
    question: "here's the second question",
    correct: "option3",
    ans1: "2-1",
    ans2: "2-2",
    ans3: "2-3 (correct)",
    ans4: "2-4",
}

// array of questions to cycle through
var qArray = [q1, q2];

// start the game when the button is clicked
$(".score-area").hide();
startBtn.click(resetGame);

function displayQuestion() {
    console.log("~~~~~~~new question~~~~~~~");
    console.log("question #" + (qcount+1));

    // displaying the question and possible answers
    questionDisplay.text(qArray[qcount].question);
    option1.text(qArray[qcount].ans1);
    option2.text(qArray[qcount].ans2);
    option3.text(qArray[qcount].ans3);
    option4.text(qArray[qcount].ans4);

    // timer currently set for 10 seconds, will change to 30 seconds for the final game
    var timer = 10;
    timeDisplay.text(timer + "s");
    // every second, the timer will decrement
    intervalId = setInterval(decrement, 1000);
    function decrement() {
        timer--;
        timeDisplay.text(timer + "s");

        // if time is up, log the answer as "timed out"
        if (timer === 0) {
            // increment qcount to keep track of the number of questions answered
            qcount++;
            stop();
            timeDisplay.text("Time's up!");
            timedOutAnswers++;
            console.log("Correct answers: " + correctAnswers);
            console.log("Incorrect answers: " + incorrectAnswers);
            console.log("Timed out answers: " + timedOutAnswers);
            console.log("qcount: " + qcount);
            updateScore();
            clearQuestion();
            setTimeout(nextQuestion, 5000);
        }
    }
    
    function stop() {
        clearInterval(intervalId);
        // clearInterval(qInterval);
    }

    // clears the question and answers
    // really just here as an intermediate step
    function clearQuestion() {
        questionDisplay.text("");
        option1.text("");
        option2.text("");
        option3.text("");
        option4.text("");
    }

    // when one of the answers is selected, check to see if the right answer was chosen
    $(".answer-button").click(function() {

        // the id of the option div is compared to the correct answer listed in the question object
        if (this.id === qArray[qcount].correct) {
            qcount++;
            stop();
            timeDisplay.text("That's right!");
            correctAnswers++;
            console.log("Correct answers: " + correctAnswers);
            console.log("Incorrect answers: " + incorrectAnswers);
            console.log("Timed out answers: " + timedOutAnswers);
            console.log("qcount: " + qcount);
            updateScore();
            clearQuestion();
            setTimeout(nextQuestion, 5000);
        } else {
            qcount++;
            stop();
            timeDisplay.text("That's wrong!");
            incorrectAnswers++;
            console.log("Correct answers: " + correctAnswers);
            console.log("Incorrect answers: " + incorrectAnswers);
            console.log("Timed out answers: " + timedOutAnswers);
            console.log("qcount: " + qcount);
            updateScore();
            clearQuestion();
            setTimeout(nextQuestion, 5000);
        }
    });
}

function nextQuestion() {
    // if all the questions have been asked, end the game
    if (qcount >= qArray.length) {
        endGame();
    } else {
        // wait 1/2 second, then display the question
        setTimeout(displayQuestion, 500);
    }
}

// reset the game, either at the beginning after clicking "start" or after a completed game
function resetGame() {
    startBtn.text("");
    startBtn.hide();
    console.log("===================================");
    console.log("game has been reset");
    console.log("===================================");
    // resetting scores
    $(".score-area").show();
    qcount = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timedOutAnswers = 0;
    updateScore();

    runGame();
}

// update the score display
// mostly an intermediate step to make sure game is updating correctly
function updateScore() {
    correctDisplay.text("Correct: " + correctAnswers);
    incorrectDisplay.text("Incorrect: " + incorrectAnswers);
    timedOutDisplay.text("Unanswered: " + timedOutAnswers);
}

// keeps the game running in between questions
function runGame() {
    console.log("!!!! new game is running!!!!");

    updateScore();

    nextQuestion();
};

function endGame() {
    console.log("========game has ended========");
    stop();
    startBtn.show();
    startBtn.text("Click to play again!");
    questionDisplay.text("");
    option1.text("");
    option2.text("");
    option3.text("");
    option4.text("");
    timeDisplay.text("");

    updateScore();
};