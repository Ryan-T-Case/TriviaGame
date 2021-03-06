//Global Variables

//We have questions with four answer choices and only one correct answer
var questionsArray = [{
    question: "Boy do I wonder, who never wore the mask of the Boy Wonder (Robin)?",
    a: "Dick Grayson",
    b: "Damian Wayne",
    c: "Tim Drake",
    answer: "Jaden Todd",
    explanation: "Tricky question...Jaden Todd was not the name of one of Batman's Robins, but Jason Todd was!"
}, {
    question: "Four men who act, only three played The Bat. Which actor did not?",
    a: "Michael Keaton",
    b: "Christian Bale",
    c: "Adam West",
    answer: "Keanu Reeves",
    explanation: "Though Keanu has played some tough characters, he has never played Batman. Sure looks like he could though!"
}, {
    question: "When Batman defeats a foe, where do the most twisted ones go?",
    a: "Gotham Asylum",
    b: "Wayne Asylum",
    c: "Darkwing Asylum",
    answer: "Arkham Asylum",
    explanation: "Arkham Asylum is a psychiatric hospital in Gotham City that houses the criminally insane."
}, {
    question: "Everyone knows the tragic fate of the Waynes, but do you remember the parents' names?",
    a: "George and Elaine Wayne",
    b: "Howard and Maria Wayne",
    c: "Harvey and Rachel Wayne",
    answer: "Thomas and Martha Wayne",
    explanation: "Dr. Thomas Wayne was a gifted physician in addition to owning Wayne Enterprises. His wife Martha was born into one of Gotham's richest families, the Kanes."
}, {
    question: "What alias would you presume, that when working undercover, Batman would assume?",
    a: "Edward Nigma",
    b: "Joe Chill",
    c: "Carmine Falcone",
    answer: "Matches Malone",
    explanation: "Matches Malone was a small-time criminal that Batman often disguised as to infiltrate Gotham's criminal underworld."
}, {
    question: "Which weapon is one that many have used, but never by Batman, who has refused?",
    a: "Grenades",
    b: "Brass Knuckles",
    c: "Mines",
    answer: "Guns",
    explanation: "Batman has vowed to never use a gun ever since his parents' death. He has used small mines and flash grenades, however."
}, {
    question: "Will you get this correct? Probably not! Who is the first villain Batman ever fought?",
    a: "The Joker",
    b: "Professor Hugo Strange",
    c: "Scarecrow",
    answer: "Doctor Death",
    explanation: "In July of 1939, Doctor Death appeared as Batman's first recurring supervillain in the comics."
},{
    question: "Batman has a canine partner that he cannot replace. What is the breed of this dog named Ace?",
    a: "Rottweiler",
    b: "Great Dane",
    c: "Husky",
    answer: "German Shepard",
    explanation: "Bat-Hound was a German Shepard that Batman and Robin rescued after he had been kidnapped by counterfeiters. He became Batman's canine crime-fighting companion."
},{
    question: "Who is the Butler on whom Batman can depend, who is also his guardian and beloved friend?",
    a: "Alfred Hitchcock",
    b: "Alfred Tennyson",
    c: "Alfred Binet",
    answer: "Alfred Pennyworth",
    explanation: "Batman's butler Alfred's family name is Pennyworth. The other three Alfreds are a poet, a psychologist, and a director."
},{
    question: "One of these nicknames does not belong. If you called Batman by this name, you would be wrong.",
    a: "The Caped Crusader",
    b: "The Dark Knight",
    c: "The World's Greatest Detective",
    answer: "The Sultan of Swat",
    explanation: "The Sultan of Swat is a nickname that belongs to Babe Ruth, a former baseball player for the New York Yankees in the 1920s and '30s."
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
var questionsLeft = 10;
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
var timeCounter = 20;
//We declare a variable that will hold the setInterval that runs the timer
var intervalId;
//We set this variable to false to prevent the timer from being sped up
var timeRunning = false;

//Global Functions

//Function used to get a question from our array
function getQuestion() {
    if (questionsLeft > 0) {
        $(".gameBox").css("background-color", "#0c6642");
        $(".gameBox").empty();
        grabbedQuestion = questionsArray.shift();
        console.log(grabbedQuestion);
        $(".gameBox").append(`
    <div class="text-center rounded border border-light timer">
        <h2>Time Remaining: </h2> 
    </div>
    <div class="text-center mt-4 mb-4 p-3 rounded border border-light question">
        <h2>${grabbedQuestion.question}</h2>
    </div>
    <div class="row options">
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-light choice">${grabbedQuestion.a}</button>
        </div>
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-light choice">${grabbedQuestion.b}</button>
        </div>
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-light choice">${grabbedQuestion.c}</button>
        </div>
        <div class="col-md-12 text-center mb-4">
        <button type="button" class="btn btn-lg btn-outline-light choice">${grabbedQuestion.answer}</button>
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
        if (totalCorrect >= 7) {
            batmanTheme.pause();
            batmanTheme.currentTime = 0;
            batmanSuccess.play();
            $(".gameBox").append(`
            <h2 class="text-center message">Blast! You've cracked my Quiz!</h2>
            <h2 class="text-center message">I think I know who Batman's secret identity is!</h2>
            <h2 class="text-center message">It must be you! With all you know about you know who.</h2>
            <br>
            <div class="col-md-12 text-center">
            <button type="button" class="btn btn-outline-light btn-lg resetButton">Click to Reset Game!</button>
            </div>
            `);
            //Button Click Event to Reset the Game
            $(".resetButton").click(function () {
                buttonClick.play();
                location.reload();
            });
        } else {
            batmanTheme.pause();
            batmanTheme.currentTime = 0;
            riddlerSuccess.play();
            $(".gameBox").append(`
            <h2 class="text-center message">I, the Riddler, have won, there's nothing you can do!</h2>
            <h2 class="text-center message">Would have expected more from a Batman fan like you!</h2>
            <br>
            <div class="col-md-12 text-center">
            <button type="button" class="btn btn-outline-light btn-lg resetButton">Click to Reset Game!</button>
            </div>
            `);
            //Button Click Event to Reset the Game
            $(".resetButton").click(function () {
                buttonClick.play();
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
    timeCounter = 20;
    //Clear the game box
    $(".gameBox").empty();
    //Change screen to success screen congratulating the player
    $(".gameBox").append(`
    <h2 class="text-center message">Curses, You're Right!</h2>
    <div class="row">
        <div class="col-md-12 text-center">
            <img src="assets/images/right-answer.gif" class="img-fluid rounded" alt="Right Answer Batman">
        </div>
        <div class="col-md-12 text-center mt-3 border border-light rounded explanation">
            <h3>${grabbedQuestion.explanation}</h3>
        </div>
    </div>
    `);
    //Total correct answers increases in score box
    totalCorrect++;
    $("#correctCounter").text(totalCorrect);
    //Proceed to next question after 10 seconds
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
    timeCounter = 20;
    //Clear the game box
    $(".gameBox").empty();
    //Change screen to success screen congratulating the player
    $(".gameBox").append(`
    <h2 class="text-center message">You Fool! You Answered Wrong!</h2>
    <div class="row">
        <div class="col-md-12 text-center">
            <img src="assets/images/wrong-answer.gif" class="img-fluid rounded" alt="Wrong Answer Riddler">
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-md-12 text-center message">
            <h3>The Correct Answer Was: ${grabbedQuestion.answer}</h3>
        </div>
        <div class="col-md-12 text-center mt-3 border border-light rounded explanation">
            <h3>${grabbedQuestion.explanation}</h3>
        </div>
    </div>
    `);
    //Total correct answers increases in score box
    totalIncorrect++;
    $("#incorrectCounter").text(totalIncorrect);
    //Proceed to next question after 10 seconds
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
    <h2 class="text-center message">Time's Up! But Don't Worry, Things are Looking Up!</h2>
    <div class="row">
        <div class="col-md-12 text-center">
            <img src="assets/images/times-up.gif" class="img-fluid rounded" alt="Times Up Riddler">
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-md-12 text-center message">
            <h3>The Correct Answer Was: ${grabbedQuestion.answer}</h3>
        </div>
        <div class="col-md-12 text-center mt-3 p-4 border border-light rounded explanation">
            <h3>${grabbedQuestion.explanation}</h3>
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
    timeCounter = 20;
    //Move on to the next question after 10 seconds
    var timesUpMessageTimeout = setTimeout(function () {
        getQuestion();
    }, 1000 * 10);
}

//The game won't run until the document is ready
$(document).ready(function () {
    //If questions left is greater than 0, keep playing. Else, end the game
    //The game begins when the start button is clicked
    $(".startButton").click(function () {
        buttonClick.play();
        isBeingPlayed = true;
        console.log("Are we playing the game? " + isBeingPlayed);
        $(".gameBox").empty();
        $(".gameBox").append(`
        <div class="border border-dark rounded p-4 howToPlay">
            <h2 class="text-center rounded border border-light p-3 instructionHeading">How to Play</h2>
            <p class="text-center text-justify subHeading">
                Prepare to feel puzzled!
            </p>
            <p class="text-center text-justify subHeading">
                You'll have 20 seconds to answer each of my 10 questions. Fail to answer correctly, or within the time limit, and you will be penalized!
            </p>
            <p class="text-center text-justify subHeading">
                And if by some chance you get lucky and answer at least 7 correctly, you win! But let's not get your hopes up!
            </p>
            <p class="text-center text-justify subHeading">
                Sit tight! My mind boggling trivia challenge will begin shortly!
            </p>
        </div>
        `)
        //Wait 30 seconds to start the game to allow time to read the instructions
        var startGameTimeout = setTimeout(function() {
        //Play game audio
        batmanTheme.play();
        //Show the score box now that the game has started
        $(".scoreBox").show();
        getQuestion();
        }, 1000 * 30);
    });
});