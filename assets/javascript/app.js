//Global Variables

//We have questions with four answer choices and only one correct answer
var questionsArray = [{
    question: "Boy do I wonder, who never wore the mask of the Boy Wonder (Robin)?",
    a: "Dick Grayson",
    b: "Damian Wayne",
    c: "Tim Drake",
    answer: "Jacob Todd"
}, {
    question: "Four men who act, only three played The Bat. Which actor did not?",
    a: "Michael Keaton",
    b: "Christian Bale",
    c: "Adam West",
    answer: "Keanu Reeves"
}, {
    question: "When Batman defeats a foe, where do the most twisted ones go?",
    a: "Gotham Asylum",
    b: "Wayne Asylum",
    c: "Darkwing Asylum",
    answer: "Arkham Asylum"
}, {
    question: "Everyone knows the tragic fate of the Waynes, but do you remember the parents' names?",
    a: "George and Elaine Wayne",
    b: "Howard and Maria Wayne",
    c: "Harvey and Rachel Wayne",
    answer: "Thomas and Martha Wayne"
}];

console.log(questionsArray);
//We have counters for correct and incorrect answers and questions not answered
var totalCorrect = 0;
console.log("Correct Answers: " + totalCorrect);
var totalIncorrect = 0;
console.log("Incorrect Answers: " + totalIncorrect);
var totalNotAnswered = 0;
console.log("Not Answered: " + totalNotAnswered);
//We have a counter for questions left set to length of questions array
var questionsLeft = 4;
console.log("Questions Remaining: " + questionsLeft);
//We set a boolean variable to prevent a reset until the game is over
var isBeingPlayed = false;
console.log("Are we playing the game? " + isBeingPlayed);
//We declare a variable on the global scope to be manipulated in our getQuestion function
var grabbedQuestion;

//Hide the Score Box Until the Game Starts
$(".scoreBox").hide();

//Global Variables for the Timer

//We establish a variable that will act as a counter that will be decremented on countdown
var timeCounter = 15;
//We declare a variable that will hold the setInterval that runs the timer
var intervalId;
//We set this variable to false to prevent the timer from being sped up
var timeRunning = false;

//Global Functions

//Function used to get a question from our array
function getQuestion() {
    if (questionsLeft > 0) {
        $(".gameBox").empty();
        grabbedQuestion = questionsArray.shift();
        console.log(grabbedQuestion);
        $(".gameBox").append(`
    <div class="timer">
    </div>
    <div class="question">
        <h2>${grabbedQuestion.question}</h2>
    </div>
    <div class="options">
    <button type="button" class="btn btn-outline-dark">${grabbedQuestion.a}</button>
    </div>
    <div class="options">
    <button type="button" class="btn btn-outline-dark">${grabbedQuestion.b}</button>
    </div>
    <div class="options">
    <button type="button" class="btn btn-outline-dark">${grabbedQuestion.c}</button>
    </div>
    <div class="options">
    <button type="button" class="btn btn-outline-dark">${grabbedQuestion.answer}</button>
    </div>
    `);
        questionsLeft--;
        console.log("Questions Remaining: " + questionsLeft);
        console.log(questionsArray);
        startCountdown();
        //Conditions for Right and Wrong Responses 
        $(".options button").click(function () {
            //If the player selects the correct answer within the time limit
            if ($(this).text() === grabbedQuestion.answer) {
                correctAnswer();
            }
            //If the player selects incorrect answer within the time limit
            else {
                incorrectAnswer();
            }
        });
    } else {
        //Stop any running countdowns
        clearInterval(intervalId);
        //Clear the game box
        $(".gameBox").empty();
        //Display Quiz Over Message Depending on Player's Performance
        if (totalCorrect >= 3) {
            $(".gameBox").append(`
            <h2 class="text-center">Blast! You've cracked my Quiz!</h2>
            <h2 class="text-center">I think I know who Batman's secret identity is!</h2>
            <h2 class="text-center">It must be you! With all you know about you know who.</h2>
            <br>
            <div class="col-md-12 text-center">
            <button type="button" class="btn btn-outline-dark btn-lg resetButton">Click to Reset Game!</button>
            </div>
            `);
            //Button Click Event to Reset the Game
            $(".resetButton").click(function () {
                location.reload();
            });
        } else {
            $(".gameBox").append(`
            <h2 class="text-center">I, the Riddler, have won, there's nothing you can do!</h2>
            <h2 class="text-center">Would have expected more from a Batman fan like you!</h2>
            <br>
            <div class="col-md-12 text-center">
            <button type="button" class="btn btn-outline-dark btn-lg resetButton">Click to Reset Game!</button>
            </div>
            `);
            //Button Click Event to Reset the Game
            $(".resetButton").click(function () {
                location.reload();
            });
        }
    }
}

//Function for Correct Answers
function correctAnswer() {
    //Stop the timer from counting down past zero
    clearInterval(intervalId);
    //Set timer to not running
    timeRunning = false;
    //Reset the timer
    timeCounter = 15;
    //Clear the game box
    $(".gameBox").empty();
    //Change screen to success screen congratulating the player
    $(".gameBox").append("<h2>" + "You're Right!" + "</h2>");
    //Total correct answers increases in score box
    totalCorrect++;
    $("#correctCounter").text(totalCorrect);
    //Proceed to next question after 5 seconds
    var correctMessageTimeout = setTimeout(function () {
        getQuestion();
    }, 1000 * 5);
}
//Function for Incorrect Answers
function incorrectAnswer() {
    //Stop the timer from counting down past zero
    clearInterval(intervalId);
    //Set timer to not running
    timeRunning = false;
    //Reset the timer
    timeCounter = 15;
    //Clear the game box
    $(".gameBox").empty();
    //Change screen to success screen congratulating the player
    $(".gameBox").append("<h2>" + "You're Wrong!" + "</h2>");
    //Total correct answers increases in score box
    totalIncorrect++;
    $("#incorrectCounter").text(totalIncorrect);
    //Proceed to next question after 5 seconds
    var incorrectMessageTimeout = setTimeout(function () {
        getQuestion();
    }, 1000 * 5);
}

//Timer Functions

//Function used to set interval
function startCountdown() {
    //Clear any previously running countdowns before starting another
    clearInterval(intervalId);
    //If the timer is not running
    if (!timeRunning) {
        //Run the countdown function every second
        intervalId = setInterval(timerCountdown, 1000);
        //Set the timer to running
        timeRunning = true;
    }
}

//The timer's countdown function
function timerCountdown() {
    //Decreases time left on counter by one
    console.log(timeCounter);
    $(".timer").html("<h2>" + "Time Remaining: " + timeCounter + "</h2>");
    timeCounter--;
    //Once the timer has reached 0
    if (timeCounter === 0) {
        //Run the timesUp function
        timesUp();
    }
}

//The timer's function for when time runs out
function timesUp() {
    //Stop the timer from counting down past zero
    clearInterval(intervalId);
    //Clear the current question from the gamebox
    $(".gameBox").empty();
    //Display the times up message
    $(".gameBox").append("<h2>" + "Times Up!" + "</h2>");
    //Log question as not answered...
    totalNotAnswered++;
    //...And display it in the Score Box
    $("#notAnsweredCounter").text(totalNotAnswered);
    //Set timer to not running
    timeRunning = false;
    //Reset the timer
    timeCounter = 15;
    //Move on to the next question after 5 seconds
    var timesUpMessageTimeout = setTimeout(function () {
        getQuestion();
    }, 1000 * 5);
}

//The game won't run until the document is ready
$(document).ready(function () {
    //If questions left is greater than 0, keep playing. Else, end the game
    //The game begins when the start button is clicked
    $("#startButton").click(function () {
        isBeingPlayed = true;
        console.log("Are we playing the game? " + isBeingPlayed);
        //Show the score box now that the game has started
        $(".scoreBox").show();
        getQuestion();
    });
    //A timer and the question with answer choices is displayed in the game box
    //The timer starts counting down from 15 seconds
    //If the player fails to select an answer within the time limit
    //Display times up screen with correct answer shown
    //Total not answered questions increases in the score box
    //Screen is displayed for 5 seconds and then next question is displayed
    //When the final question is answered
    //Display results screen that logs to total scores from the score box
    //If Correct answers is 75% or better, congratulate player
    //If Correct answers is between 50% and 75%, tell the player to improve
    //Else acknowledge the player failed and urge to try again
    //Display button that will start the game over when clicked if game is over
});