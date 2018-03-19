var questionsArray = [
    {
        question: "What is Kramer's first name",
        answers: {
                    a: "Karl",
                    b: "Cosmo",
                    c: "Astro",
                    d: "Kenny"
                },
        correctAnswer: "b"
    },
    {
        question: "What's the name for someone who speaks too quetly",
        answers: {
                    a: "soft-talker",
                    b: "soft-speaker",
                    c: "quiet-speaker",
                    d: "low-talker"
                },
        correctAnswer: "d"
    },
    {
        question: "Who is Jerry's nemesis",
        answers: {
                    a: "The Soup Nazi",
                    b: "Bania",
                    c: "Newman",
                    d: "J. Peterman"
                },
        correctAnswer: "c"
    },
    {
        question: "What is the name of the restaurant where Jerry and the gang spend much of their time",
        answers: {
                    a: "Manny's",
                    b: "Monk's",
                    c: "Milt's",
                    d: "Minnie's"
                },
        correctAnswer: "b"
    },
    {
        question: "A picture of which charachter is sold to a couple for $5,000",
        answers: {
                    a: "Jerry",
                    b: "Kramer",
                    c: "Elaine",
                    d: "George"
                },
        correctAnswer: "b"
    },
    {
        question: "Which of the following is not a part of the Festivus celebrations",
        answers: {
                    a: "Airing of Greivences",
                    b: "Aluminum Pole",
                    c: "Dance of Rage",
                    d: "Feats of Strength"
                },
        correctAnswer: "c"
    },
    
]
var timePerQuesiton = 10;

var questionIndex = 0;
var time = timePerQuesiton;
var timerIntervalId;
var outOfTime = false;
var lockOut = false;
var inPlay = false;
var numberCorrect = 0;
var numberWrong = 0;
var numberUnanswered = 0;
var audio = new Audio("./assets/sounds/Seinfeld-Show-Funky-Tune.mp3");
    audio.volume = 0.4; //turning dow the volume a bit
var audioEnd = new Audio("./assets/sounds/Seinfeld-theme-music.mp3");

console.log(questionsArray)

//hide questions untill the user clicks start
$("#main-quiz-display").hide();
$("#end-stats-display").hide();
$("#question-answer-display").hide();



$("#start-btn").on("click", function(){
    if(inPlay){
        return;
    }
    inPlay = true;
    setUpQuestion();
    $("#time-display").html(time)
    timerIntervalId = setInterval(countDown, 1000)
    $("#main-quiz-display").show();
    $("#start-btn").hide();

})

$(".answer-choice").on("click", function(){
    if(!inPlay){
        return
    }
    if(lockOut){
        return;
    }
    
    //stop the clock
    clearInterval(timerIntervalId);
    //lockout
    lockOut = true;
    //check the answer against the correct answer
    console.log("you clicked answer: " + $(this).val())
    if($(this).val()==questionsArray[questionIndex].correctAnswer){
        console.log("Correct! Nice job!")
        $("#message-display").html("Correct! Nice job!")
        $("#question-answer-display").show();
        numberCorrect++;
        audio.play();
        setTimeout(nextQuesiton, 3000);
    }else {
        console.log("Nope!")
        $("#message-display").html("Nope!")
        $("#question-answer-display").show();
        numberWrong++;
        audio.play();
        setTimeout(nextQuesiton, 3000);
    }
       
})

$("#start-over-btn").on("click", function(){
    numberCorrect = 0;
    numberWrong = 0;
    numberUnanswered = 0;
    audioEnd.pause();
    audioEnd.currentTime = 0;
    $("#main-quiz-display").show();
    $("#end-stats-display").hide();
    
    questionIndex = -1;
    nextQuesiton();

})

function setUpQuestion(){

    $("#question-display").html(questionsArray[questionIndex].question);
    //set answers
    $("#answer-a").html(questionsArray[questionIndex].answers.a);
    $("#answer-b").html(questionsArray[questionIndex].answers.b);
    $("#answer-c").html(questionsArray[questionIndex].answers.c);
    $("#answer-d").html(questionsArray[questionIndex].answers.d);
}

function countDown(){
    time -= 1;
    $("#time-display").html(time)
    if(time === 0){
        clearInterval(timerIntervalId);
        //$("#time-display").html("Time's Up!!")
        $("#message-display").html("Time's Up!");
        numberUnanswered++;
        outOfTime = true;
        lockOut = true;
        audio.play();
        $("#question-answer-display").show();
        setTimeout(nextQuesiton, 3000);
        //reveal question
    }
}

function nextQuesiton (){
     //go to next question index and set it up 
     questionIndex++;
        if(!(questionIndex < questionsArray.length)){
            showEndStats();
            return;
        }
     setUpQuestion();
    //reset time
    time = timePerQuesiton;
    //reset out of time flag
    outOfTime = false;
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

function showEndStats(){
    audioEnd.play();
    $("#main-quiz-display").hide();
    $("#question-answer-display").hide();

    $("#numb-correct-display").html(numberCorrect);
    $("#numb-wrong-display").html(numberWrong);
    $("#numb-unanswered-display").html(numberUnanswered);
    $("#end-stats-display").show();

}

// To add:
// Buttons - hover effect, change type?, change style
// edit anser reveal section - include images or Gifs
// include sounds?
// fix styling/formating overall
// add questions
// make code DRY