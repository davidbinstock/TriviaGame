//===================================================================================
//==================use these variables to change timing parameters==================
//===================================================================================

//time allotted per question, in seconds
var timePerQuesiton = 10;
//time between questions / for answer reveal, in seconds
var timeBetweenQuestions = 3.5;

//===================================================================================
//============================Establishing Questions=================================
//===================================================================================
var questionsArray = [
    {
        question: "What is Kramer's first name?",
        answers: {
                    a: "Karl",
                    b: "Cosmo",
                    c: "Astro",
                    d: "Kenny"
                },
        correctAnswer: ["b", "Cosmo"],
        image: "./assets/images/kramer.gif"
    },
    {
        question: "What is the term for someone who speaks too quetly?",
        answers: {
                    a: "soft-talker",
                    b: "soft-speaker",
                    c: "quiet-speaker",
                    d: "low-talker"
                },
        correctAnswer: ["d", "low-talker"],
        image: "./assets/images/lowtalker2.gif"
    },
    {
        question: "Who is Jerry's nemesis?",
        answers: {
                    a: "The Soup Nazi",
                    b: "Bania",
                    c: "Newman",
                    d: "J. Peterman"
                },
        correctAnswer: ["c", "Newman"],
        image: "./assets/images/newman.gif"
    },
    {
        question: "What is the name of the gang's diner hangout?",
        answers: {
                    a: "Manny's",
                    b: "Monk's",
                    c: "Milt's",
                    d: "Minnie's"
                },
        correctAnswer: ["b", "Monk's"],
        image: "./assets/images/monks.jpg"
    },
    {
        question: "A picture of which character is sold to a couple for $5,000?",
        answers: {
                    a: "Kramer",
                    b: "Jerry",
                    c: "Elaine",
                    d: "George"
                },
        correctAnswer: ["a", "Kramer"],
        image: "./assets/images/thekramer.jpg"
    },
    {
        question: "Which of the following is not a part of the Festivus celebrations?",
        answers: {
                    a: "Airing of Greivences",
                    b: "Aluminum Pole",
                    c: "Dance of Rage",
                    d: "Feats of Strength"
                },
        correctAnswer: ["c", "Dance of Rage"],
        image: "./assets/images/festivus.gif"
    },
]
console.log(questionsArray)
//===================================================================================
//============================Declaring Variables====================================
//===================================================================================
var questionIndex = 0;
var time = timePerQuesiton;
var timerIntervalId;
var answerRevealTimeoutId;
var lockOut = false;
var guessedRight = false;
var numberCorrect = 0;
var numberWrong = 0;
var numberUnanswered = 0;
var audio = new Audio("./assets/sounds/Seinfeld-Show-Funky-Tune.mp3");
    audio.volume = 0.4; //turning dow the volume a bit
var audioEnd = new Audio("./assets/sounds/Seinfeld-theme-music.mp3");
//===================================================================================
//============================Setting Up Initial State===============================
//===================================================================================

//hide questions, answer-reveal, and end-stats
$("#main-quiz-display").hide();
$("#end-stats-display").hide();
$("#question-answer-display").hide();



//===================================================================================
//============================Event Handlers=========================================
//===================================================================================

//Clicking the "Start" Button
//***************************
$("#start-btn").on("click", function(){
    $("#start-btn").hide();
    //"nextQuestion" function increases question index so set it to -1 to get 0
    questionIndex = -1;
    nextQuesiton();
})

//Clicking answer Choices
//***********************
$(".answer-choice").on("click", function(){
    //cehck if lockout flag (see "answerReveal" function below) is true
    if(lockOut){return;}
    console.log("you clicked answer: " + $(this).val())
    //check the answer against the correct answer
    guessedRight=false;
    if($(this).val()==questionsArray[questionIndex].correctAnswer[0]){
        numberCorrect++;
        guessedRight = true;
        console.log("Correct! Nice job!");
        answerReveal("Correct! Nice job!");
        
        
    }else {
        numberWrong++;
        console.log("Nope!");
        answerReveal("Nope!");
    }
})

//Clicking the "Start Over" button
//********************************
$("#start-over-btn").on("click", function(){
    //resetting variables
    numberCorrect = 0;
    numberWrong = 0;
    numberUnanswered = 0;
    //pausing song and setting time to 0 so it starts from begining next time
    audioEnd.pause();
    audioEnd.currentTime = 0;
    //showing main quiz and hiding end-stats DOM elements 
    $("#main-quiz-display").show();
    $("#end-stats-display").hide();
    //starting the questions over
    //"nextQuestion" function increases question index so set it to -1 to get 0
    questionIndex = -1;
    nextQuesiton();
})

//===================================================================================
//============================Functions==============================================
//===================================================================================

//displaying questions to the DOM
//********************************
function setUpQuestion(){
    //set questions to DOM element with ID "question-display"
    $("#question-display").html(questionsArray[questionIndex].question);
    //set answer choices to their respective button elements in the DOM
    $("#answer-a").html(questionsArray[questionIndex].answers.a);
    $("#answer-b").html(questionsArray[questionIndex].answers.b);
    $("#answer-c").html(questionsArray[questionIndex].answers.c);
    $("#answer-d").html(questionsArray[questionIndex].answers.d);
}

//question countdown
//********************************
function countDown(){
    time -= 1;
    $("#time-display").html(time)
    //if time runs out, 
    if(time === 0){
        numberUnanswered++;
        //reveal answer
        answerReveal("Time's Up!");
    }
}

//tell user if they got answer correct and reveal correct answer, as well as additional content (sound, images, etc.)
//*******************************************************************************************************************
function answerReveal(message){
    //stop the clock
    clearInterval(timerIntervalId);
    //lockout answer choice buttons
    lockOut = true;

    //display image or GIF
    $("#image").attr("src", questionsArray[questionIndex].image)
    // indicate if they got it right, wrong, or if time was up
    $("#message-display").html(message);
    //reveal the correct answer
    if(guessedRight){
        $("#correct-answer").html("'" + questionsArray[questionIndex].correctAnswer[1]+ "' was the correct answer!" );
    }else{
        $("#correct-answer").html("The correct answer was '" + questionsArray[questionIndex].correctAnswer[1] +"' ...");
    }    
    //show the answer field
    $("#question-answer-display").height("10px");
    $("#question-answer-display").show().animate({height: "300px"});
    //play audio
    audio.play();
    //move to next question after a set # of seconds
    answerRevealTimeoutId = setTimeout(nextQuesiton, 1000*timeBetweenQuestions);
}

//go to next question
//********************************
function nextQuesiton (){
     //go to next question index 
     questionIndex++;
        //if index is not less than the length of the questions array, return and show end stats
        if(!(questionIndex < questionsArray.length)){
            showEndStats();
            return;
        }
        //otherwise, continue..
    //set up question
     setUpQuestion();
    //reset time
    time = timePerQuesiton;
    //reset lockour flag
    lockOut = false;
    //clear message field
    $("#message-display").html("");
    //start timer
    $("#time-display").html(time);
    timerIntervalId = setInterval(countDown, 1000);
    //show main display and hide answer display
    $("#question-answer-display").hide();
    $("#main-quiz-display").show();
}
//display end-stats
//********************************
function showEndStats(){
    audioEnd.play();
    $("#main-quiz-display").hide();
    $("#question-answer-display").hide();
    $("#numb-correct-display").html(numberCorrect);
    $("#numb-wrong-display").html(numberWrong);
    $("#numb-unanswered-display").html(numberUnanswered);
    $("#end-stats-display").show();
}
//stop all intervals and timeouts (for troubleshooting/development purposes)
//********************************
function stopAll (){
    clearInterval(timerIntervalId);
    clearTimeout(answerRevealTimeoutId);
}

//===================================================================================
//============================admin/development notes=================================
//===================================================================================
// To add:
// Buttons - hover effect, change type?, change style
// edit anser reveal section - include images or Gifs
// include sounds?
// fix styling/formating overall
// add questions
// make code DRY