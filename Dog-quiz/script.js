// declare Vars
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer');
const questionDisplay = document.getElementById('question');
const buttons = document.querySelectorAll('button');
const result = document.getElementById('result');
const gameDiv = document.getElementById('game-div');
const scoreDiv = document.getElementById('score-div');
const userResult = document.getElementById('user-result');

let gameState = 'waiting';
let score = 0;
let secondsRemaining = 150;
let currentQuestion = 0;
let startTime;
let initials;
// questions
const questions = [
  {
    questionText: "1. True or false: Akitas are the only dog breed that have tails that curl upwards",
    answers: ['Akitas are genetically unique', 'Akitas, unlike other dogs, never uncurl their tail', 'Akitas do not have curled tails', 'Other dog breeds also have curled tails, like huskies and pugs'],
    correctAnswer: 1,
  },
  {
    questionText: "2. What does AKC stand for?",
    answers: ['American Kennel Club', 'Awesome and Keen Club', 'Amazing Kind and Clean', 'American Kingdom of Clubs'],
    correctAnswer: 0,
  },
  { 
   questionText: "3. Which of the following statements is false?",
   answers: ["All dogs are related to wolves", "Some dogs are more closely related to wolves than other dogs", "Akitas are more closely related to wolves than pugs", 'Wolves preyed on humans before they were domesticated'],
   correctAnswer: 3,
  },
  { 
   questionText: "4. Which of these foods can you safely feed your dog?",
   answers: ["Avocado", "Milk", "Grapes", "Bananas"],
   correctAnswer: 3,
  },
  { 
   questionText: "5. Which is the largest dog breed?",
   answers: ["German shepherd", "Great Dane", "Akita", "Golden retriever"],
   correctAnswer: 1,
  },
  { 
   questionText: "6. In 2020, the most owned dog breed across America is:",
   answers: ["Labrador retriever", "Akita", "Great Dane", "German Shepherd"],
   correctAnswer: 0,
  },
  { 
   questionText: "7. According to the American Kennel Club, how many dog breeds are there?",
   answers: ["104", "150", "85", "196"],
   correctAnswer: 3,
  },
  { 
   questionText: "8. What is the fastest dog breed?",
   answers: ["Great Dane", "Golden retriever", "German shepherd", "Greyhound"],
   correctAnswer: 3,
  },
  { 
   questionText: "9. What is the oldest breed of dog?",
   answers: ["Akita", "Chow Chow", "German shepherd", "Saluki"],
   correctAnswer: 3,
  },
   { 
   questionText: "10. Barack Obama’s family preferred which dog breed?",
   answers: ["Portuguese water dog", "Akita", "Corgi", "Maltese mountain dog"],
   correctAnswer: 0,
  }, 
];

function displayQuestion (questionIndex) {
  if (currentQuestion >= questions.length) {
    gameOver();
    return;
  }
  scoreDisplay.innerHTML = score;
  questionDisplay.innerHTML = questions[currentQuestion].questionText;
  buttons.forEach(function (button, i) {
    button.innerHTML = questions[currentQuestion].answers[i];
  });
}

function startGame () {
  buttons[0].removeEventListener('click', startGame)
  buttons.forEach(function (button, i) {
    button.style.visibility = 'visible';
    button.addEventListener('click', function () {
      if (questions[currentQuestion].correctAnswer === i) {
        score += 1;
        result.innerHTML = 'Correct!';
        result.style.color = '#00aa00';
      } else {
        console.log(secondsRemaining)
        secondsRemaining -= 5;
        console.log(secondsRemaining)
        result.innerHTML = 'Incorrect';
        result.style.color = '#aa0000';
      }
      currentQuestion += 1;
      displayQuestion(currentQuestion);
    });
  });
  gameState = 'active';
  displayQuestion(currentQuestion);
  startTime = Date.now();
  timer.innerHTML = secondsRemaining;
  setInterval(function () {
    if (gameState === 'active') {
      if (secondsRemaining) {
        secondsRemaining -= 1
      }
      timer.innerHTML = secondsRemaining;
      if (secondsRemaining < 1) {
        gameOver();
      }
    }
  }, 1000);
}

if (gameState === 'waiting') {
  buttons[0].style.visibility = 'visible';
  buttons[0].innerHTML = 'START';
  buttons[0].addEventListener('click', startGame);
}

function gameOver () {
  gameState = 'over';
  alert('GAME OVER')
  initials = prompt('please type your initials');
  scoreDisplay.innerHTML = 'View Score';
  scoreDisplay.addEventListener('click', function () {
    gameDiv.style.visibility = 'hidden';
    scoreDiv.style.visibility = 'visible';
    userResult.innerHTML = `Final Score for ${initials}: ${score} out of 10`;
  }); 
  questionDisplay.innerHTML = 'Game Over!'
  buttons.forEach((button) => {
    button.style.visibility = 'hidden';
  });
}