`use strict`;

// gets random integer
const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// display outputs
const pointsSpan = document.querySelector("#points");
const scoreSpan = document.querySelector("#score");
const questionDiv = document.querySelector("#question");
const strikeSpan = document.querySelector("#strike");
const choiceSpan = document.querySelector("#choice")

// buttons and inputs
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");

// Default variables 
let currentQuestion =
  "What cartoon character lives in a pineapple under the sea?";
let currentAnswer = "spongebob";
let currentChoice = "Spongebob, Dexter, Courage, Popeye"
let currentPoints = 10;
let currentScore = 0;
let currentStrike = 0;



const allQuestionCategoryButtons = document.querySelectorAll(".category-question-button");

//update board text
const newBoard = () => {
  pointsSpan.textContent = currentPoints;
  scoreSpan.textContent = currentScore;
  strikeSpan.textContent = "Strike: " + currentStrike;
  questionDiv.textContent = currentQuestion;
  choiceSpan.textContent = currentChoice;
};
newBoard();

const disableButton = () => {
  allQuestionCategoryButtons.forEach(b => b.disabled = true)
};

const enableButton = () => {
  allQuestionCategoryButtons.forEach(b => b.disabled = false)
};

disableButton()

function removeCaps(string) {
  return string.toLowerCase()
}


// Finish this function that checks the user's answer.
const checkAnswer = () => {
  console.log("You guessed:", answerInputBox.value);
  console.log("Correct answer:", currentAnswer);

  if (removeCaps(answerInputBox.value) === removeCaps(currentAnswer)) {
    currentScore += currentPoints;
    enableButton();
    submitButton.disabled = true;
  } else {
    currentStrike += 1;
  }

  if (currentStrike === 3) {
    alert('Your score was ' + currentScore +'!')
   currentQuestion = "What cartoon character lives in a pineapple under the sea?";
   currentAnswer = "spongebob";
   currentChoice = "Spongebob, Dexter, Courage, Popeye"
   currentPoints = 10;
   currentScore = 0;
   currentStrike = 0;
   newBoard();
  } else {
    newBoard();
  }
};


//gets category id and gets questionb
const getQuestion = async (categoryId) => {
  const response = await fetch("https://opentdb.com/api.php?amount=50&category=" + categoryId + "&type=multiple&encode=base64");
  const data = await response.json();
  console.log(data);
  newData(data);
}


allQuestionCategoryButtons.forEach(button => {
  const category = button.getAttribute("category-id");
  button.addEventListener("click", () => getQuestion(category));
  submitButton.disabled = false;
}); 


// when button clicked the function is ran
submitButton.addEventListener("click", checkAnswer);



const newData = (data) => {
  const i = randomInt(data.results.length);

  // Update variables with new data
  currentQuestion = atob(data.results[i].question);
  currentAnswer = atob(data.results[i].correct_answer);
  let answer = data.results[i].correct_answer
  currentPoints = 10;

  let choices = [...data.results[i].incorrect_answers];
  choices[choices.length] = answer;
  choices = choices.sort((a, b) => (Math.random() > .5) ? 1 : -1);

  for (let x = 0; x < choices.length; x++) {
    choices[x] = atob(choices[x])
    console.log(choices[x])
 }
  
  currentChoice = choices.join(', '); 
  
  // Display the new question and chouces  
  newBoard();
};

