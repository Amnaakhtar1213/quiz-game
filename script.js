 const startScreen = document.getElementById("start-screen");
 const quizScreen =  document.getElementById("quiz-screen");
 const resultScreen =  document.getElementById("result-screen");
 const startBtn =  document.getElementById("start-btn");
 const queText =  document.getElementById("que-text");
 const ansContainer =  document.getElementById("answers-container");
 const currQuesSpan =  document.getElementById("current-que");
 const totalQueSpan =  document.getElementById("total-que");
 const scoreSpan =  document.getElementById("score");
 const finalScoreSpan =  document.getElementById("final-score");
 const maxScoreSpan =  document.getElementById("max-score");
 const resultMsg =  document.getElementById("result-msg");
 const resetBtn =  document.getElementById("reset-btn");
 const progressBar =  document.getElementById("progress");


 const quizQuestions = [
  {
    question: "What is capital of south korea?",
    answer: [
      {text: "London", correct: false},
      {text: "Istanbul", correct: false},
      {text: "Seoul", correct: true},
      {text: "Busan", correct: false},
    ]
  },
  {
    question: "which mountain is the highest in south korea?",
    answer: [
      {text: "mount everest", correct: false},
      {text: "jirisan", correct: false},
      {text: "seoraksan", correct: false},
      {text: "Hallasan", correct: true},
    ]
  },
  {
    question: "Which traditional Korean dish is made of fermented vegetables, usually cabbage and radish?",
    answer: [
      {text: "Bibimbap", correct: false},
      {text: "Japchae", correct: false},
      {text: "Kimchi", correct: true},
      {text: "Bulgogi", correct: false},
    ]
  },
  {
    question: "Which river flows through Seoul?",
    answer: [
      {text: "Nakdong River", correct: false},
      {text: "Geum River", correct: false},
      {text: "Han River", correct: true},
      {text: "Imjin River", correct: false},
    ]
  },
  {
    question: "Which Korean company is globally known for electronics and smartphones?",
    answer: [
      {text: "Samsung", correct: true},
      {text: "LG", correct: false},
      {text: "Hyundai", correct: false},
      {text: "Kia", correct: false},
    ]
  },
  {
    question: "Which river forms part of the boundary between North and South Korea?",
    answer: [
      {text: "Han River", correct: false},
      {text: "Imjin River", correct: true},
      {text: "Nakdong River", correct: false},
      {text: "Yalu River", correct: false},
    ]
  },
  
 ];

 let currentQuestionIndex = 0;
 let score = 0;
 let answerDisabled = false;

 totalQueSpan.textContent = quizQuestions.length;
 maxScoreSpan.textContent = quizQuestions.length;

 startBtn.addEventListener("click", startQuiz);
 resetBtn.addEventListener("click", resetQuiz);

 function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
 }

 function showQuestion(){

   answerDisabled = false;

   const currentQuestion = quizQuestions[currentQuestionIndex];
   currQuesSpan.textContent = currentQuestionIndex + 1;   
   
   const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
   progressBar.style.width = progressPercent + "%";

   queText.textContent = currentQuestion.question;

   ansContainer.innerHTML = "";

   currentQuestion.answer.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("ans-btn");

    btn.dataset.correct = answer.correct;

    btn.addEventListener("click", selectAnswer);

    ansContainer.appendChild(btn);
   })
  };

   function selectAnswer(event){
          
    if(answerDisabled) return

    answerDisabled = true;

    const selectedBtn  = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    Array.from(ansContainer.children).forEach((btn) => {
      if(btn.dataset.correct === "true"){
        btn.classList.add("correct")
      } else if(btn === selectedBtn){
        btn.classList.add("incorrect")
      }
    });
    
    if(isCorrect){
      score++;
      scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
          showQuestion()
        } else {
          showResults();
        }

    }, 1000)
   }

   function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if(percentage === 100){
      resultMsg.textContent = "Perfect! you are genius 😉"
    } else if(percentage >= 80){
      resultMsg.textContent = "Great job!you know your stuff 😎"
    } else if(percentage >= 60){
      resultMsg.textContent = "Good effort keep learning 🙂"
    } else if(percentage >= 40){
      resultMsg.textContent = "Not bad!try again 🙂"
    } else {
      resultMsg.textContent = "Keep studying! 😦"
    }
   }
   

 function resetQuiz() {
   resultScreen.classList.remove("active");

   startQuiz();
 }





