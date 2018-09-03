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

//Audio Variables
var batmanTheme = new Audio("assets/audio/batman-theme.mp3");
batmanTheme.loop = true;
var buttonClick = new Audio("assets/audio/button-click.mp3");
var batmanSuccess = new Audio("assets/audio/batman-success.mp3");
batmanSuccess.loop = true;
var riddlerSuccess = new Audio("assets/audio/riddler-theme.mp3");
riddlerSuccess.loop = true;
//Global Variables for the Timer

//We establish a variable that will act as a counter that will be decremented on countdown
var timeCounter = 10;
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
    <div class="text-center timer">
        <h2>Time Remaining: </h2> 
    </div>
    <div class="text-center mb-4 question">
        <h2>${grabbedQuestion.question}</h2>
    </div>
    <div class="row options">
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-dark">${grabbedQuestion.a}</button>
        </div>
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-dark">${grabbedQuestion.b}</button>
        </div>
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-dark">${grabbedQuestion.c}</button>
        </div>
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-dark">${grabbedQuestion.answer}</button>
        </div>
    </div>
    `);
        shuffleChoices();
        questionsLeft--;
        console.log("Questions Remaining: " + questionsLeft);
        console.log(questionsArray);
        startCountdown();
        //Conditions for Right and Wrong Responses 
        $(".options button").click(function () {
            buttonClick.play();
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
            batmanTheme.pause();
            batmanTheme.currentTime = 0;
            batmanSuccess.play();
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
            batmanTheme.pause();
            batmanTheme.currentTime = 0;
            riddlerSuccess.play();
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
    timeCounter = 10;
    //Clear the game box
    $(".gameBox").empty();
    //Change screen to success screen congratulating the player
    $(".gameBox").append(`
    <h2 class="text-center">Curses, You're Right!</h2>
    <div class="row">
        <div class="col-md-12 text-center">
            <img src="assets/images/right-answer.gif" class="img-fluid" alt="Right Answer Batman">
        </div>
    </div>
    `);
    //Total correct answers increases in score box
    totalCorrect++;
    $("#correctCounter").text(totalCorrect);
    //Proceed to next question after 5 seconds
    var correctMessageTimeout = setTimeout(function () {
        getQuestion();
    }, 1000 * 10);
}
//Function for Incorrect Answers
function incorrectAnswer() {
    //Stop the timer from counting down past zero
    clearInterval(intervalId);
    //Set timer to not running
    timeRunning = false;
    //Reset the timer
    timeCounter = 10;
    //Clear the game box
    $(".gameBox").empty();
    //Change screen to success screen congratulating the player
    $(".gameBox").append(`
    <h2 class="text-center">You Fool! You Answered Wrong!</h2>
    <div class="row">
        <div class="col-md-12 text-center">
            <img src="assets/images/wrong-answer.gif" class="img-fluid" alt="Wrong Answer Riddler">
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-md-12 text-center">
            <h3>The Correct Answer Was: ${grabbedQuestion.answer}</h3>
        </div>
    </div>
    `);
    //Total correct answers increases in score box
    totalIncorrect++;
    $("#incorrectCounter").text(totalIncorrect);
    //Proceed to next question after 5 seconds
    var incorrectMessageTimeout = setTimeout(function () {
        getQuestion();
    }, 1000 * 10);
}

//Function to Shuffle Order of Answer Choices
function shuffleChoices() {
    //Grabs first element in the DOM with the options class
    var options = document.querySelector(".options")
    //The duration of our loop is based on the amount of children the element has
    for (var i = options.children.length; i >= 0; i--) {
        //Pick a random child and append it to it's parent element
        options.appendChild(options.children[Math.random() * i | 0]);
    }
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
    $(".gameBox").append(`
    <h2 class="text-center">Time's Up! But Don't Worry, Things are Looking Up!</h2>
    <div class="row">
        <div class="col-md-12 text-center">
            <img src="assets/images/times-up.gif" class="img-fluid" alt="Times Up Riddler">
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-md-12 text-center">
            <h3>The Correct Answer Was: ${grabbedQuestion.answer}</h3>
        </div>
    </div>
    `);
    //Log question as not answered...
    totalNotAnswered++;
    //...And display it in the Score Box
    $("#notAnsweredCounter").text(totalNotAnswered);
    //Set timer to not running
    timeRunning = false;
    //Reset the timer
    timeCounter = 10;
    //Move on to the next question after 5 seconds
    var timesUpMessageTimeout = setTimeout(function () {
        getQuestion();
    }, 1000 * 10);
}

//The game won't run until the document is ready
$(document).ready(function () {
    //If questions left is greater than 0, keep playing. Else, end the game
    //The game begins when the start button is clicked
    $("#startButton").click(function () {
        buttonClick.play();
        isBeingPlayed = true;
        console.log("Are we playing the game? " + isBeingPlayed);
        //Play game audio
        batmanTheme.play();
        //Show the score box now that the game has started
        $(".scoreBox").show();
        getQuestion();
    });
});