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
var qArray = [q1];


// reset the game, either at the beginning after clicking "start" or after a completed game
function resetGame() {
    startBtn.text("");
    console.log("===================================");
    console.log("game has been reset");
    console.log("===================================");
    // resetting scores
    qcount = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timedOutAnswers = 0;
    updateScore();

    runGame();
};

// update the score display
// mostly an intermediate step to make sure game is updating correctly
function updateScore() {
    correctDisplay.text("Correct: " + correctAnswers);
    incorrectDisplay.text("Incorrect: " + incorrectAnswers);
    timedOutDisplay.text("Unanswered: " + timedOutAnswers);
}

// keeps the game running in between questions
function runGame() {
    qcount = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    timedOutAnswers = 0;

    updateScore();

    // cycling through the array of questions
    for (var i = 0; i < qArray.length; i++) {
        if (i === qcount) {
            console.log("var i = " + i);
            console.log("qcount: " + qcount);
            question(qArray[i]);
        }
        if (qcount === qArray.length) {
        stop();
        endGame();
        }
    }
    

    // this function will run every time a new question is asked
    function question(qNumber) {
        console.log("~~~~~~~new question~~~~~~~");
        // qcount++;
        console.log("question #" + (qcount+1));
        var timer = 10;
        timeDisplay.text(timer + "s");
        // every second, the timer will decrement
        var intervalId = setInterval(decrement, 1000);
        function decrement() {
            timer--;
            timeDisplay.text(timer + "s");

            if (timer === 0) {
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
                if (qcount === qArray.length) {
                    stop();
                    endGame();
                }
            }
        }
        function stop() {
            clearInterval(intervalId);
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

        // displaying the question and possible answers
        questionDisplay.text(qNumber.question);
        option1.text(qNumber.ans1);
        option2.text(qNumber.ans2);
        option3.text(qNumber.ans3);
        option4.text(qNumber.ans4);

        // when one of the answers is selected, check to see if the right answer was chosen
        $(".answer-button").on("click", function() {

            // the id of the option div is compared to the correct answer listed in the question object
            if (this.id === qNumber.correct) {
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
                if (qcount === qArray.length) {
                    stop();
                    endGame();
                }
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
                if (qcount === qArray.length) {
                    stop();
                    endGame();
                }
            }
        });
    }; 

    function endGame() {
        startBtn.text("Click to play again");
        questionDisplay.text("");
        option1.text("");
        option2.text("");
        option3.text("");
        option4.text("");
        timeDisplay.text("");
    
        updateScore();
    };
};


// start the game when the button is clicked
$(document).ready(function() {
    startBtn.on("click", resetGame);
});