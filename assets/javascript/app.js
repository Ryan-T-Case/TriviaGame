//The game won't run until the document is ready
$(document).ready(function () {
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
    var questionsLeft = questionsArray.length;
    console.log("Questions Remaining: " + questionsLeft);
    //We set a boolean variable to prevent a reset until the game is over
    var isBeingPlayed = false;
    console.log("Are we playing the game? " + isBeingPlayed);
    //If questions left is greater than 0, keep playing. Else, end the game
    //The game begins when the start button is clicked
    $("#startButton").click(function () {
        isBeingPlayed = true;
        console.log("Are we playing the game? " + isBeingPlayed);
        //Function used to get a question from our array
        function getQuestion(x) {
            $(".gameBox").empty();
            $(".gameBox").append(`
            <div class="question">
                <h2>${questionsArray[x].question}</h2>
            </div>
            <div class="options">
                <button>${questionsArray[x].a}</button>
                <button>${questionsArray[x].b}</button>
                <button>${questionsArray[x].c}</button>
                <button>${questionsArray[x].answer}</button>
            </div>
            `);
        }
        getQuestion(0);
        $(".options button").click(function() {
            if ($(this).text() === questionsArray[0].answer) {
                totalCorrect++
                console.log("Correct Answers: " + totalCorrect);
                getQuestion(1);
            }
        });

    });
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