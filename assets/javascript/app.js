var questionsArray = [
    {
        question: "Q1: The correct answer is b",
        answers: {
                    a: "Q1 answer a",
                    b: "Q1 answer b",
                    c: "Q1 answer c",
                    d: "Q1 answer d"
                },
        correctAnswer: "b"
    },
    {
        question: "Q2: The correct answer is d",
        answers: {
                    a: "Q2 answer a",
                    b: "Q2 answer b",
                    c: "Q2 answer c",
                    d: "Q2 answer d"
                },
        correctAnswer: "d"
    }
    
]
var questionIndex = 0;
var time = 5;
var timerIntervalId;
var outOfTime = false;

console.log(questionsArray)

$("#start-btn").on("click", function(){
    setUpQuestion();
    timerIntervalId = setInterval(countDown, 1000)

})

$(".answer-choice").on("click", function(){
    console.log("you clicked answer: " + $(this).val())
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
        outOfTime = true;
    }
}

function nextQuesiton (){
    questionIndex++;
    setUpQuestion();
}

//set timer for 30 sec
    
    






// display a question with 4 possible answers

//start a timer for 30 seconds
    //if the timer runs out before an answer is clicked -display "time-up" and show correct answer
    
    //if an answer is chosen before the timer ends
        //if the answer is correct - display "correct" and go to next quesiton
        //if the answer is wrong display "wrong" and show the correct answer and go to next question