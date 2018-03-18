var questionsArray = [
    {
        question: "what is Kramer's first name",
        answers: {
                    a: "Astro",
                    b: "Cosmo",
                    c: "Lonzo",
                    d: "Gonzo"
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
                    d: "J Peterman"
                },
        correctAnswer: "c"
    }
    
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

console.log(questionsArray)

//hide questions untill the user clicks start
$("#main-quiz-display").hide();
$("#end-stats-display").hide();


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
        numberCorrect++;
        setTimeout(nextQuesiton, 3000);
    }else {
        console.log("Nope!")
        $("#message-display").html("Nope!")
        numberWrong++;
        setTimeout(nextQuesiton, 3000);
    }
       
})

$("#start-over-btn").on("click", function(){
    numberCorrect = 0;
    numberWrong = 0;
    numberUnanswered = 0;
    
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
        $("#time-display").html("Time's Up!!")
        numberUnanswered++;
        outOfTime = true;
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
    //start timer
    $("#time-display").html(time)
    timerIntervalId = setInterval(countDown, 1000)
}

function showEndStats(){
    $("#main-quiz-display").hide();

    $("#numb-correct-display").html(numberCorrect);
    $("#numb-wrong-display").html(numberWrong);
    $("#numb-unanswered-display").html(numberUnanswered);
    $("#end-stats-display").show();

}


// display a question with 4 possible answers

//start a timer for 30 seconds
    //if the timer runs out before an answer is clicked -display "time-up" and show correct answer
    
    //if an answer is chosen before the timer ends
        //if the answer is correct - display "correct" and go to next quesiton
        //if the answer is wrong display "wrong" and show the correct answer and go to next question