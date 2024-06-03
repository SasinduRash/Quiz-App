const questions = [
    {
        question:"Which planet is known as the 'Red Planet'?",
        answers: [
            {text:"Mars", correct:true},
            {text:"Venus", correct:false},
            {text:"Jupiter", correct:false},
            {text:"Saturn", correct:false},
        ] 
    },
    {
        question:"Who painted the famous artwork 'Mona Lisa'?",
        answers: [
            {text:"Vincent van Gogh", correct:false},
            {text:"Leonardo da Vinci", correct:true},
            {text:"Pablo Picasso", correct:false},
            {text:"Michelangelo", correct:false},
        ] 
    },
    {
        question:"What is the capital city of Australia?",
        answers: [
            {text:"Sydney", correct:false},
            {text:"Melbourne", correct:false},
            {text:"Brisbane", correct:false},
            {text:"Canberra", correct:true},
        ] 
    },
    {
        question:"In which year did the Titanic sink?",
        answers: [
            {text:"1910", correct:false},
            {text:"1912", correct:true},
            {text:"1915", correct:false},
            {text:"1920", correct:false},
        ] 
    },
    {
        question:"Who wrote the play 'Romeo and Juliet'?",
        answers: [
            {text:"William Shakespeare", correct:true},
            {text:"Oscar Wilde", correct:false},
            {text:"Jane Austen", correct:false},
            {text:"Charles Dickens", correct:false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});

startQuiz();