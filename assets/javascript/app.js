 $(document).ready(function () {
        //this question and answer the application
        var questions = [
            {
    question: "Which State of USA was once part of Mexico?", 
        choice: ["Texas", "Maryland", "New York", "Alaska"],
        answer: 0,
        photo: "../assets/images/texas.gif"
    
             },

             {
    question: "Who is the third President of USA?", 
        choice: ["Thomas Jefferson", "John Adams", "Abraham Lincoln", "George Washington"],
        answer: 0,
        photo: "../assets/images/ThomasJefferson.gif"
        
             }, 
             {
    question: "Which city is known as the Big Apple?", 
        choice: ["Los Angeles", "Washington", "Houston", "New York" ],
        answer: 3,
        photo: "../assets/images/New-York-City.jpg"
            }, 
            {
    question: "What is the number of state in USA?", 
        choice: ["24", "50", "60", "49" ],
        answer: 1,
        photo: "../assets/images/map.gif"
            }, 
            {
    question: "Who had longest tenure as President of USA?", 
        choice: ["John F. Kennedy", "Franklin D. Roosevelt", "George Washington", "James Carter" ],
        answer: 1,
        photo: "../assets/images/FRoosevelt.gif"
            }, 
            {
    question: "How many star are in the flag of USA?", 
        choice: ["50", "20", "60", "75" ],
        answer: 0,
        photo: "../assets/images/star.jpg"
            }
            ];
        //global variables
        var correctCount = 0;
        var wrongCount = 0;
        var unanswerCount = 0;
        var timer = 20;
        var intervalId;
        var userGuess ="";
        var running = false;
        var qCount = questions.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];
        
        
//hiding reset div
    $("#reset").hide();
//click start button to start game
    $(".start").on("click", function () {
    $(".start").hide();
    displayQuestion();
    runTimer();
    for(var i = 0; i < questions.length; i++) {
    holder.push(questions[i]);
        }
            })
//timer start
    function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
            }
        }
//timer countdown
function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
            timer --;
        
//stop timer if reach 0
    if (timer === 0) {
    unanswerCount++;
    stop();
    $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
    hidepicture();
            }	
        }
//timer stop
    function stop() {
    running = false;
    clearInterval(intervalId);
        }
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
    function displayQuestion() {
            //generate random index in array
            index = Math.floor(Math.random()*questions.length);
            pick = questions[index];
        
//	if (pick.shown) {
//recursive to continue to generate new index until one is chosen that has not shown in this game yet
        //		displayQuestion();
//	} else {
//iterate through answer array and display
    $("#questionblock").html("<h2>" + pick.question + "</h2>");
    for(var i = 0; i < pick.choice.length; i++) {
    var userChoice = $("<div>");
    userChoice.addClass("answerchoice");
    userChoice.html(pick.choice[i]);
    //assign array position to it so can check answer
    userChoice.attr("data-guessvalue", i);
    $("#answerblock").append(userChoice);
        //	}
        }
//click function to select answer and outcome
    $(".answerchoice").on("click", function () {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));
//correct guess or wrong guess outcomes
    if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess="";
        $("#answerblock").html("<p>Correct!</p>");
        hidepicture();
        
    } else {
        stop();
        wrongCount++;
        userGuess="";
        $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        hidepicture();
            }
        })
        }
function hidepicture () {
    $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        questions.splice(index,1);
        var hidpic = setTimeout(function() {
        $("#answerblock").empty();
        timer= 20;
 //run the score screen if all questions answered
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
    $("#questionblock").empty();
    $("#questionblock").html("<h3>Game Over!  Final Result: </h3>");
    $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
    $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
    $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
    $("#reset").show();
    correctCount = 0;
    wrongCount = 0;
    unanswerCount = 0;
        
} else {
    runTimer();
 displayQuestion();
        
        }
   }, 3000);
    }
$("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i++) {
                questions.push(holder[i]);
            }
            runTimer();
            displayQuestion();
        
        })
        
        })