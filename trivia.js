`use strict`;

// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Select the spans & divs where we'll display outputs.
const pointsSpan = document.querySelector("#points");
const scoreSpan = document.querySelector("#score");
const questionDiv = document.querySelector("#question");
const strikeSpan = document.querySelector("#strike");
const choiceSpan = document.querySelector("#choice")

// Select the buttons and input fields where users can provide inputs.
const filmButton = document.querySelector("#film");
const cartoonButton = document.querySelector("#cartoon");
const tvButton = document.querySelector("#tv");
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");

// Starting variables - we'll fill replace these with the API
let currentQuestion =
  "What cartoon character lives in a pineapple under the sea?";
let currentAnswer = "spongebob";
let currentChoice = "Spongebob, Dexter, Courage, Popeye"
let currentPoints = 10;
let currentScore = 0;
let currentStrike = 0;
let currentQuestionLive = true;

// Function to update the text on the board to match our variables.
const updateBoard = () => {
  pointsSpan.textContent = currentPoints;
  scoreSpan.textContent = currentScore;
  strikeSpan.textContent = "Strike:" + currentStrike;
  questionDiv.textContent = currentQuestion;
  choiceSpan.textContent = currentChoice
};

// Call the function!
updateBoard();


function removeCaps(string) {
  return string.toLowerCase()
}


// Finish this function that checks the user's answer.
const checkAnswer = () => {
  console.log("You guessed:", answerInputBox.value);
  console.log("Correct answer:", currentAnswer);

  if (removeCaps(answerInputBox.value) === removeCaps(currentAnswer)) {
    currentScore += currentPoints;
  } else {
    currentStrike += 1;
  }

  // if (currentStrike === 3) {
  
  // }
  updateBoard();
};

for (let char of answerInputBox.value) {
  
}

// Attach that function to the submit button via an event listener.
submitButton.addEventListener("click", checkAnswer);

// API call for the three question byttons on screen.
//Film Questions
const getFilmQuestion = async () => {
  const response = await fetch("https://opentdb.com/api.php?amount=50&category=11&type=multiple");
  const data = await response.json();
  console.log(data);

  updateWithNewData(data);
};
filmButton.addEventListener("click", getFilmQuestion);


//Cartoon Questions
const getCartoonQuestion = async () => {
  const response = await fetch("https://opentdb.com/api.php?amount=50&category=32&type=multiple");
  const data = await response.json();
  console.log(data);

  updateWithNewData(data);
};
cartoonButton.addEventListener("click", getCartoonQuestion);

//TV Questions
const getTVQuestion = async () => {
  const response = await fetch("https://opentdb.com/api.php?amount=50&category=14&type=multiple");
  const data = await response.json();
  console.log(data);

  updateWithNewData(data);
};
tvButton.addEventListener("click", getTVQuestion);

const updateWithNewData = (data) => {
  const i = getRandomInt(data.length);

  // Update variables with new data
  currentQuestion = data[i].question;
  currentAnswer = data[i].correct_answer;
  currentPoints = 10;
  currentChoice = data[i].incorrect_answers;

  // Display the new question
  updateBoard();
};

