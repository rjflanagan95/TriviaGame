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

// this interval tracks the timer
var intervalId;
var transitionInterval;
var displayInterval;
// timer currently set for 6 seconds, will change to 30 seconds for the final game
var timer = 6;

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
    correct: "option4",
    ans1: "2-1",
    ans2: "2-2",
    ans3: "2-3",
    ans4: "2-4 (correct)",
}
var q3 = {
    question: "here's the third question",
    correct: "option2",
    ans1: "3-1",
    ans2: "3-2 (correct)",
    ans3: "3-3",
    ans4: "3-4",
}
var q4 = {
    question: "here's the fourth question",
    correct: "option3",
    ans1: "4-1",
    ans2: "4-2",
    ans3: "4-3 (correct)",
    ans4: "4-4",
}

// array of questions to cycle through
var qArray = [q1, q2, q3, q4];

// reset the game, either at the beginning after clicking "start" or after a completed game
function resetGame() {
    startBtn.text("");
    startBtn.hide();
    console.log("==================================================");
    console.log("game has been reset");
    console.log("==================================================");
    // resetting scores
    $(".score-area").show();
    timeDisplay.text("");
    timeDisplay.show();
    qcount = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timedOutAnswers = 0;
    clearInterval(intervalId);
    updateScore();

    nextQuestion();
}

// start the game when the button is clicked
$(".score-area").hide();
startBtn.click(resetGame);

function displayQuestion() {
    console.log("~~~~~~~question #" + (qcount+1) + "~~~~~~~");

    // displaying the question and possible answers
    questionDisplay.text(qArray[qcount].question);
    option1.text(qArray[qcount].ans1);
    option2.text(qArray[qcount].ans2);
    option3.text(qArray[qcount].ans3);
    option4.text(qArray[qcount].ans4);

    var localTimer = timer;
    timeDisplay.text(localTimer + "s");
    // every second, the timer will decrement
    intervalId = setInterval(decrement, 1000);

    function stopTimer() {
        clearInterval(intervalId);
    }

    function decrement() {
        localTimer--;
        timeDisplay.text(localTimer + "s");


        // if time is up, log the answer as "timed out"
        if (localTimer === 0) {
            // increment qcount to keep track of the number of questions answered
            qcount++;
            timeDisplay.text("Time's up!");
            timedOutAnswers++;
            console.log("Correct answers: " + correctAnswers);
            console.log("Incorrect answers: " + incorrectAnswers);
            console.log("Timed out answers: " + timedOutAnswers);
            console.log("qcount: " + qcount);
            updateScore();
            clearQuestion();
            clearTimeout(transitionInterval);
            // wait 3 seconds so the user can read the result, then ask the next question
            transitionInterval = setTimeout(nextQuestion, 3000);
            stopTimer();
        }
    }
    
    // when one of the answers is selected, check to see if the right answer was chosen
    $(".answer-button").click(checkAnswer);
    function checkAnswer() {
        if (qcount < qArray.length) {
            // the id of the option div is compared to the correct answer listed in the question object
            if (this.id === qArray[qcount].correct) {
                qcount++;
                timeDisplay.text("That's right!");
                correctAnswers++;
                console.log("Correct answers: " + correctAnswers);
                console.log("Incorrect answers: " + incorrectAnswers);
                console.log("Timed out answers: " + timedOutAnswers);
                console.log("qcount: " + qcount);
                updateScore();
                clearQuestion();
                clearTimeout(transitionInterval);
                // wait 3 seconds so the user can read the result, then ask the next question
                transitionInterval = setTimeout(nextQuestion, 3000);
                stopTimer();
            } else {
                qcount++;
                timeDisplay.text("That's wrong!");
                incorrectAnswers++;
                console.log("Correct answers: " + correctAnswers);
                console.log("Incorrect answers: " + incorrectAnswers);
                console.log("Timed out answers: " + timedOutAnswers);
                console.log("qcount: " + qcount);
                updateScore();
                clearQuestion();
                clearTimeout(transitionInterval);
                // wait 3 seconds so the user can read the result, then ask the next question
                transitionInterval = setTimeout(nextQuestion, 3000);
                stopTimer();
            }
        }
    }
}

// clears the question and answers
function clearQuestion() {
    questionDisplay.text("");
    option1.text("");
    option2.text("");
    option3.text("");
    option4.text("");
}

function nextQuestion() {
    updateScore();
    // if all the questions have been asked, end the game
    if (qcount === qArray.length) {
        endGame();
    } else if (qcount < qArray.length) {
        // display the next question
        // the reason this is not a generic `else` statement is that i was encountering a bug where qcount would sometimes go above qArray.length and then keep increasing indefinitely
        // so this prevents the `displayQuestion()` function from running if the bug persists
        displayQuestion();
    }
}

// update the score display
function updateScore() {
    correctDisplay.text("Correct: " + correctAnswers);
    incorrectDisplay.text("Incorrect: " + incorrectAnswers);
    timedOutDisplay.text("Unanswered: " + timedOutAnswers);
}

function endGame() {
    console.log("==================================================");
    console.log("game has ended");
    console.log("==================================================");
    startBtn.show();
    startBtn.text("Click to play again!");
    questionDisplay.text("");
    option1.text("");
    option2.text("");
    option3.text("");
    option4.text("");
    timeDisplay.hide();

    updateScore();
}