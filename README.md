# TriviaGame

This is a timed trivia game, where you have 30 seconds to answer each question. After all the questions have been asked, you'll see the overall score (correct/incorrect/unanswered) and have an opportunity to restart the game.

This version of the game has at least one major bug that is causing strange behavior. If you go through the game and let all the questions time out, the results are as expected. If you attempt to answer any question after Q1, it starts skipping questions and applying your answer to the questions it skips. For any playthrough after the first game ends, the answer to Q1 is applied to all the questions.
