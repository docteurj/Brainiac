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

const choicesPlaces = document.querySelectorAll(".choices");
console.log(choicesPlaces)

const choiceRadio = document.querySelectorAll(".choiceRadios")

// buttons and inputs
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");

// Default variables 
let currentQuestion;
let currentAnswer;
let currentChoices = [];
let currentPoints = 10;
let currentScore = 0;
let currentStrike = 0;

for (let i = 0; i < currentChoices.length; i++) {
  choicesPlaces[i].textContent = currentChoices[i];
}

const allQuestionCategoryButtons = document.querySelectorAll(".category-question-button");

//update board text
const newBoard = () => {
  pointsSpan.textContent = currentPoints;
  scoreSpan.textContent = currentScore;
  strikeSpan.textContent = "Strike: " + currentStrike;
  questionDiv.textContent = currentQuestion;
};
newBoard();

const disableButton = () => {
  allQuestionCategoryButtons.forEach(b => b.disabled = true)
};

const enableButton = () => {
  allQuestionCategoryButtons.forEach(b => b.disabled = false)
};

const enableRadios = () => {

}

disableButton()

function removeCaps(string) {
  return string.toLowerCase()
}

let answerFound = false;

// Finish this function that checks the user's answer.
const checkAnswer = (index) => {
  console.log(choiceRadio[index]);

  if (answerFound) {
    window.alert("Correct Answer Already Found!");
    choiceRadio[index].checked = false
    return;
  }

  choiceRadio[index].setAttribute("disabled", true);
  if (removeCaps(choicesPlaces[index].textContent) === removeCaps(currentAnswer)) {
    alert("Correct Answer!")
    currentScore += currentPoints;
    newBoard();
    enableButton();
    answerFound = true;
    submitButton.disabled = true;
  } else {
    currentStrike += 1;
  }

  if (currentStrike === 3) {
    alert('That is 3 strikes! Game Over! Your score was ' + currentScore + '!' + ' The correct answer was ' + currentAnswer)
    getQuestion(32);
    choiceRadio.forEach(radio => {
      radio.removeAttribute("disabled");
      radio.checked = false;
    })

    for (let i = 0; i < currentChoices.length; i++) {
      choicesPlaces[i].textContent = currentChoices[i];
    }
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
  newData(data);
  disableButton()
  submitButton.disabled = false;
}

getQuestion(32);


allQuestionCategoryButtons.forEach(button => {
  const category = button.getAttribute("category-id");
  button.addEventListener("click", () => getQuestion(category));
});


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
  }

  for (let i = 0; i < choices.length; i++) {
    choicesPlaces[i].textContent = choices[i];
  }

  choiceRadio.forEach(radio => {
    radio.removeAttribute("disabled");
    radio.checked = false;
  })

  answerFound = false;
  // Display the new question and chouces  
  newBoard();
};

