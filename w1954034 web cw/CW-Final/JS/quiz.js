let resultContainer = document.querySelector(".result-container");
let restartButton = document.getElementById("restart-button");
let startButton = document.getElementById("start-button");
let quizContainer = document.getElementById("quiz-container");
let nextButton = document.getElementById("next-button");
let timeLeft = document.querySelector(".timer-left");
let mainContainer = document.getElementById("main-container");
let countOfQuestion = document.querySelector(".number-of-question");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");

let totalTime = 0;
let countDown;
let questionCount;
let scoreCount = 0;
let count = 11;

restartButton.addEventListener("click", () => {
    initial();
    mainContainer.classList.remove("hide");
    resultContainer.classList.add("hide");
});

nextButton.addEventListener("click", (displayNext = () => {
    questionCount += 1;

if (questionCount == quizArray.length) {
        mainContainer.classList.add("hide");
        resultContainer.classList.remove("hide");
        userScore.innerHTML = "You've completed the Quiz!<br>Your got " + scoreCount + " out of " + questionCount+"<br>Total time taken: " + totalTime + "s";
        totalTime=0;
    } else {
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";

        quizDisplay(questionCount);
        count = 11;
        clearInterval(countDown);
        timerDisplay();
    }
}));

const timerDisplay = () => {
    countDown = setInterval(() => {
        count--;
        totalTime++;
        timeLeft.innerHTML =  `${count}s`;
        if (count == 0) {
            clearInterval(countDown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCard = document.querySelectorAll(".container-mid");
    quizCard.forEach((card) => {
        card.classList.add("hide");
    });
    quizCard[questionCount].classList.remove("hide");
};

function quizCreator() {

    for (let i of quizArray) {

        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>`;

        quizContainer.appendChild(div);

    }
}

function initial(){
    quizContainer.innerHTML="";
    questionCount=0;
    scoreCount=0;
    count=11;
    clearInterval(countDown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options=question.querySelectorAll(".option-div");
    console.log(options);
    if(userSolution=== quizArray[questionCount].correct){
        userOption.classList.add("correct");
        scoreCount++;
    }else{
        userOption.classList.add("incorrect");

        options.forEach((element)=>{
            if(element.innerText==quizArray[questionCount].correct){
                element.classList.add("correct")
            }
        });
    }
    clearInterval(countDown);
    options.forEach((element)=>{
        element.disabled=true;
    });
}

startButton.addEventListener("click",()=>{
    startScreen.classList.add("hide");
    mainContainer.classList.remove("hide");
    initial()
});

window.onload=()=>{
    startScreen.classList.remove("hide");
    mainContainer.classList.add("hide");
};

