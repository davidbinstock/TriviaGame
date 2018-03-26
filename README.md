# TriviaGame

### This app tests your Seinfeld knowledge


### Instructions:
* click the "start" button to begin the quiz
* you will be asked a series of questions; you have 10 seconds to answer each question
* click on the answer choice to submit your answer; the app will indicate if you have guessed correctly and reveal the right answer if you quessed wrong.
* if you run out of time, the app will mark the questions as unanswered and reveal the correct answer.
* at the end of the quiz, the app will display how many questions you got right, how many you got wrong, and how many you didn;t answer (ran out of time)
* you can begin the quiz again by clicking the "start" over button

### Notes
* 10 seconds per questions and 3.5 seconds for the reveal are hard-coded in. these can be changed in the "app.js" file
* questions are stored as objects with properties for the question (string), answer options (array), correct answer (array - letter and actual text), and image to display during the reveal. Question objects are stored in an array.
* the timer uses a setInterval to decrement the time remaining every second, and the answer reveal uses a setTimeout to wait a set amout of time (currently set to 3.5 seconds) before continuing on to the next question. 
* there are currently only 6 questions; it would be fun to have more
* it might be interesting if when you "start over" you get a different set of questions
* I still want to add functionality to change the order of the answers each time the same question is displayed
* I also want to add funcitonality that highlights the actual answer buttons during the reveal