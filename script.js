// declair the DOM elements
const questionNumEle = document.getElementById('question-number');
const questionEle = document.getElementById('question')
const optionEle = document.querySelectorAll('.option')
const timerEle  = document.getElementById('timer')
const nextBtnEle  = document.getElementById('next-btn')
const resultEle  = document.getElementById('result')
const scoreEle  = document.getElementById('score')



// Quiz data
const quizData = [
  {
    question: "Who is known as the 'Father of the Nation' in India?",
    options: ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Mahatma Gandhi", "Subhas Chandra Bose"],
    answer: "Mahatma Gandhi"
  },
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
    answer: "New Delhi"
  },
  {
    question: "In which year did India gain independence?",
    options: ["1947", "1950", "1930", "1960"],
    answer: "1947"
  },
  {
    question: "Which river is known as the 'Ganga of the South'?",
    options: ["Godavari", "Krishna", "Kaveri", "Narmada"],
    answer: "Kaveri"
  },
  {
    question: "Who was the first President of India?",
    options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Dr. Zakir Husain", "Dr. Sarvepalli Radhakrishnan"],
    answer: "Dr. Rajendra Prasad"
  },
  {
    question: "Which is the largest state in India by area?",
    options: ["Maharashtra", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh"],
    answer: "Rajasthan"
  },
  {
    question: "What is the national flower of India?",
    options: ["Rose", "Lotus", "Tulip", "Sunflower"],
    answer: "Lotus"
  },
  {
    question: "In which year was the Indian Constitution adopted?",
    options: ["1947", "1950", "1952", "1949"],
    answer: "1950"
  },
  {
    question: "Which Indian city is known as the 'Silicon Valley of India'?",
    options: ["Hyderabad", "Bangalore", "Chennai", "Pune"],
    answer: "Bangalore"
  },
  {
    question: "Who was the first woman Prime Minister of India?",
    options: ["Indira Gandhi", "Sarojini Naidu", "Pratibha Patil", "Sonia Gandhi"],
    answer: "Indira Gandhi"
  }
];




// creat new variables
let currQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
let answerSelected = false;


// call the function to load questions
 loadQuestion();

 // function to load questions
 function loadQuestion(){
  const currentQuestion = quizData[currQuestionIndex];

  questionNumEle.innerText = `Question ${currQuestionIndex + 1} of ${quizData.length}`;
  questionEle.innerText = currentQuestion.question;

  questionEle.classList.add('questionAnimation-start');
  setTimeout(()=>{
   questionEle.classList.remove('questionAnimation-start');
  }, 2000)

  // set option
  optionEle.forEach((btn, index)=>{
    btn.innerText = currentQuestion.options[index];
    btn.style.backgroundColor = 'rgb(29, 76, 146)'; // Reset color
    btn.disabled = false;
  });

  // reset the timer and start it
  timeLeft = 10;
  timerEle.innerText = `Time Left: ${timeLeft}s`;
  startTimer();

  // disabled the btn while time is running
  nextBtnEle.disabled = true;
 }

 // function to start the timer
 function startTimer(){
  nextBtnEle.classList.add('disable');
  clearInterval(timer);
  timer = setInterval(()=>{
    timeLeft--;
    timerEle.innerText = `Time Left: ${timeLeft}s`;
    if(timeLeft <= 0 ){
      clearInterval(timer);
      // Enable the btn after timeup
     
      nextBtnEle.classList.remove('disable')
      nextBtnEle.disabled = false;

    }
  }, 1000)
 }


 // eventListner for option click
 optionEle.forEach((btn)=>{
  btn.addEventListener('click', (e)=>{

    optionEle.forEach((btn) => btn.disabled = true);

    // found that which option is selected by user
    const selectedAnswer = e.target.innerText;  

    // which option is correct    
    const correctAnswer = quizData[currQuestionIndex].answer;

    if(selectedAnswer  ===  correctAnswer){
      score++;
      e.target.style.backgroundColor ="green";
    }else{
      e.target.style.backgroundColor ="red";
      optionEle.forEach((btn)=>{
        if( btn.innerText === correctAnswer){
          btn.style.backgroundColor ="green";
        }
      });
    }

    // enable the after selecting any option
    nextBtnEle.disabled = false;
    nextBtnEle.classList.remove('disable')



  });
 });

 // eventListner fot next button
 nextBtnEle.addEventListener('click',()=>{
   currQuestionIndex++;
   if(currQuestionIndex <  quizData.length){
    loadQuestion();

   }else{
      showResult();
   }
 });

 // function to show  the final result
 function showResult(){
  resultEle.classList.remove('hide');
  scoreEle.innerHTML = `<h3> Your score is: ${score} Out of ${quizData.length} </h3><p>Thank You For Playing! 🙏🏻</p>`;
  document.getElementById('quiz').classList.add('hide')
 }

