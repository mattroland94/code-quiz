let questions = [
    {
        ques: "Commonly used data types DO NOT include:",
        ans: "alerts",
        c1: "strings",
        c2: "booleans",
        c3: "alerts",
        c4: "numbers"
    },
    {
        ques: "The condition of an if / else statement is enclosed with ______.",
        ans: "3. parenthesis",
        c1: "1. quotes",
        c2: "2. curly brackets",
        c3: "3. parenthesis",
        c4: "4. square brackets"
    },
    {
        ques: "Arrays in JavaScript can be used to store ______.",
        ans: "4. all of the above",
        c1: "1. numbers and strings",
        c2: "2. other arrays",
        c3: "3. booleans",
        c4: "4. all of the above"
    },
    {
        ques: "String values must be enclosed within ______ when being assigned to variables.",
        ans: "3. quotes",
        c1: "1. commas",
        c2: "2. curly brackets",
        c3: "3. quotes",
        c4: "4. parenthesis"
    },
    {
        ques: "ans very useful tool used during development and debugging for printing content to the debugger is:",
        ans: "4. console.log",
        c1: "1. JavaScript",
        c2: "2. terminal/bash",
        c3: "3. for loops",
        c4: "4. console.log"
    }
];

var startB = document.querySelector(".start-btn");
var FSSubB = document.querySelector("#submit");
var BackB = document.querySelector("#go-back");
var clearScoreB = document.querySelector("#clears");
var viewHSB = document.querySelector("#view-hs");
var timerL = document.querySelector("#timer");
var landingPageL = document.querySelector("#main-screen");
var questionsL = document.querySelector("#question-screen");
var completeL = document.querySelector("#finish-screen");
var HSL = document.querySelector("#high-screen");
var questionTitL = document.querySelector("#quest-title");
var COneL = document.querySelector("#sel1");
var CTwoL = document.querySelector("#sel2");
var CThreeL = document.querySelector("#sel3");
var CFourL = document.querySelector("#sel4");
var wrongORrightL = document.querySelector("#worc");
var userFSL = document.querySelector("#finalsc");
var userInitialsL = document.querySelector("#useri");
var userSL = document.querySelector("#userS");

startB.addEventListener('click', startG);
viewHSB.addEventListener('click', viewHS);
BackB.addEventListener('click', pageReturn);
clearScoreB.addEventListener('click', clearHS);
FSSubB.addEventListener('click', subUserHS);

score = 0;
timerL.textContent = 0;
var remainingTime = 99;

function startG() {
    var timerInt = Intset(function() {
        if (remainingTime > 0) {
            timerL.textContent = remainingTime;
            remainingTime--;
        }
        else {
            timerL.textContent = 0;
            Intset(timerInt);
            endG();
        }
    }, 1000);

    resetDisplay();
    nextQuest();
}

var currentQuestIn = 0;

function nextQuest() {
    questionsL.style.display = "block";

    if (currentQuestIn <= 4) {
        var currentQuest = questions[currentQuestIn];

        questionTitL.textContent = currentQuest.ques;
        COneL.textContent = currentQuest.c1;
        CTwoL.textContent = currentQuest.c2;
        CThreeL.textContent = currentQuest.c3;
        CFourL.textContent = currentQuest.c4;

        COneL.addEventListener('click', checkIncrement);
        CTwoL.addEventListener('click', checkIncrement);
        CThreeL.addEventListener('click', checkIncrement);
        CFourL.addEventListener('click', checkIncrement);

        function checkIncrement(userChoice) {
            if (userChoice.target.innerHTML === currentQuest.ans) {
                wrongORrightL.textContent = "Correct!";
                score = score + (Math.floor(Math.random() * 20) + 1);
                currentQuestIn += 1;
                clearListener();
                nextQuest();
            }
            else {
                wrongORrightL.textContent = "Incorrect!";
                remainingTime = remainingTime - 20;
                currentQuestIn += 1;
                clearListener();
                nextQuest();
            }
            
            function clearListener() {
                COneL.removeEventListener('click', checkIncrement);
                CTwoL.removeEventListener('click', checkIncrement);
                CThreeL.removeEventListener('click', checkIncrement);
                CFourL.removeEventListener('click', checkIncrement);
            }
        }
    }
    else {
        endG();
    }
}

function endG() {
    resetDisplay();
    userFSL.textContent = score;
    remainingTime = 0;
}

function viewHS() {
    resetDisplay();
    HSL.style.display = "block";
    timeRemaining = 0;
}

function theScores() {
    var userName = localStorage.getItem('initials');
    var uScore = localStorage.getItem('score');

    userInitialsL.textContent = userName;
    userSL.textContent = uScore;
}

function subUserHS(action) {
    action.preventDefault();
    resetDisplayTypes();
    HSL.style.display = "block";

    var IInputL = document.querySelector("#initials").ariaValueMax;

    localStorage.setItem('initials', IInputL);
    localStorage.setItem('score', score);

    theScores();
}

function pageReturn() {
    resetDisplay();
    landingPageL.style.display = "block";
    location.reload();
}

function clearHS() {
    localStorage.clear();
    userInitialsL.textContent = "";
    userSL.textContent = "";
}

function resetDisplay() {
    landingPageL.style.display = "none";
    completeL.style.display = "none";
    HSL.style.display = "none";
    questionsL.style.display = "none";
}