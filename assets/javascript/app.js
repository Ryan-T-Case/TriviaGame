//The game won't run until the document is ready
$(document).ready(function () {
    //We have questions with four answer choices and only one correct answer
    var questionsArray = [{
        question: "Which of the following is not the name of one of Batman's many sidekicks to wear the Robin suit?",
        a: "Dick Grayson",
        b: "Damian Wayne",
        c: "Tim Drake",
        answer: "Jacob Todd"
    }, {
        question: "Which of the following actors has never played Batman?",
        a: "Michael Keaton",
        b: "Christian Bale",
        c: "Adam West",
        answer: "Keanu Reeves"
    }, {
        question: "What is the name of the asylum where many of Batman's villains have been brought as patients?",
        a: "Gotham Asylum",
        b: "Wayne Asylum",
        c: "Darkwing Asylum",
        answer: "Arkham Asylum"
    }, {
        question: "Who were Batman's Parent's?",
        a: "George and Elaine Wayne",
        b: "Howard and Maria Wayne",
        c: "Harvey and Rachel Wayne",
        answer: "Thomas and Martha Wayne"
    }, {
        question: "Which cartoon has Batman had multiple crossover appearances with?",
        a: "Looney Toons",
        b: "Teenage Mutant Ninja Turtles",
        c: "Sherlock Holmes",
        answer: "Scooby Doo"
    }];

    console.log(questionsArray);
    //We have counters for correct and incorrect answers and questions not answered
    //We have a counter for questions left set to length of questions array
    //We set a boolean variable to prevent a reset until the game is over
    //If questions left is greater than 0, keep playing. Else, end the game
    //The game begins when the start button is clicked
    //A timer and the question with answer choices is displayed in the game box
    //The timer starts counting down from 15 seconds
    //If the player selects the correct answer within the time limit
    //Change screen to success screen congratulating the player
    //Total correct answers increases in score box
    //Screen is displayed for 5 seconds and then next question is displayed
    //If the player selects incorrect answer within the time limit
    //Change the screen to failure screen that displays correct answer
    //Total incorrect answers decreases in the score box
    //Screen is displayed for 5 seconds and then next question is displayed
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