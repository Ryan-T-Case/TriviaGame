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
var totalNotAnswered = 4;
console.log("Not Answered: " + totalNotAnswered);
//We have a counter for questions left set to length of questions array
var questionsLeft = 4;
console.log("Questions Remaining: " + questionsLeft);
//We set a boolean variable to prevent a reset until the game is over
var isBeingPlayed = false;
console.log("Are we playing the game? " + isBeingPlayed);
//We declare a variable on the global scope to be manipulated in our getQuestion function
var grabbedQuestion;

//Global Functions

//Function used to get a question from our array
function getQuestion() {
    $(".gameBox").empty();
    grabbedQuestion = questionsArray.shift();
    console.log(grabbedQuestion);
    $(".gameBox").append(`
    <div class="question">
        <h2>${grabbedQuestion.question}</h2>
    </div>
    <div class="options">
        <button>${grabbedQuestion.a}</button>
    </div>
    <div class="options">
        <button>${grabbedQuestion.b}</button>
    </div>
    <div class="options">
        <button>${grabbedQuestion.c}</button>
    </div>
    <div class="options">
        <button>${grabbedQuestion.answer}</button>
    </div>
    `);
    questionsLeft--;
    console.log("Questions Remaining: " + questionsLeft);
    console.log(questionsArray);
    //Conditions for Right and Wrong Responses 
    $(".options button").click(function () {
        //If the player selects the correct answer within the time limit
        if ($(this).text() === grabbedQuestion.answer) {
            //Change screen to success screen congratulating the player
            alert("Right!");
            //Total correct answers increases in score box
            //Screen is displayed for 5 seconds and then next question is displayed
            totalCorrect++;
            $("#correctCounter").text(totalCorrect);
            //Proceed to next question
            getQuestion();
        }
        //If the player selects incorrect answer within the time limit
        else {
            //Change the screen to failure screen that displays correct answer
            alert("Wrong!");
            //Total incorrect answers decreases in the score box
            //Screen is displayed for 5 seconds and then next question is displayed
            totalIncorrect++;
            $("#incorrectCounter").text(totalIncorrect);
            //Proceed to next question
            getQuestion();
        }
    });
}

//The game won't run until the document is ready
$(document).ready(function () {
    //If questions left is greater than 0, keep playing. Else, end the game
    //The game begins when the start button is clicked
    $("#startButton").click(function () {
        isBeingPlayed = true;
        console.log("Are we playing the game? " + isBeingPlayed);
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