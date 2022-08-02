`use strict`;

// gets random integer
const randomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// display outputs
const pointsSpan = document.querySelector("#points");
const scoreSpan = document.querySelector("#score");
const imgSpan = document.querySelector("#img");
const strikeSpan = document.querySelector("#strike");


// buttons and inputs
const heroButton = document.querySelector("#hero");
const resetButton = document.querySelector("#reset");
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");

// Default variables 
let currentAnswer = "doctor doom";
let currentPoints = 10;
let currentScore = 0;
let currentStrike = 0;
let currentImg = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/222-doctor-doom.jpg"


//update board text
const updateBoard = () => {
  pointsSpan.textContent = currentPoints;
  scoreSpan.textContent = currentScore;
  strikeSpan.textContent = "Strike:" + currentStrike;
  imgSpan.innerHTML = `<img src="${currentImg}"/>`;
};
updateBoard();



function removeCaps(string) {
  return string.toLowerCase()
}


// Finish this function that checks the user's answer.
const checkAnswer = () => {

  if (removeCaps(answerInputBox.value) === removeCaps(currentAnswer)) {
    currentScore += currentPoints;
    getNextHero()
  } else {
    currentStrike += 1;
    updateBoard()
  }
  
  if (currentStrike == 5) {
    alert("Your total score was " + currentScore + "!");
     currentAnswer = "doctor doom";
     currentPoints = 10;
     currentScore = 0;
     currentStrike = 0;
     currentImg = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/222-doctor-doom.jpg"
     updateBoard()
  } 
  
};

heroButton.addEventListener("click", e => {
  currentStrike += 1;
  updateBoard()
  getNextHero()
  updateBoard()
  if (currentStrike == 5) {
    alert("Your total score was " + currentScore + "!");
    // currentAnswer = "doctor doom";
    currentScore = 0;
    currentStrike = 0;
    // currentImg = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/222-doctor-doom.jpg"
    getNextHero()
    updateBoard()
  }
})

// when button clicked the function is ran
submitButton.addEventListener("click", checkAnswer);

// API data for the three question buttons on screen.
//Get the next hero
const getNextHero = async () => {
  const i = randomInt(731);
  const myQuery = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${i}.json`;
  const response = await fetch(myQuery);
  const data = await response.json();
 updateWithNewData(data);
  
};

const updateWithNewData = (data) => {
  // Update variables with new data
  currentImg = data.images.md;
  currentAnswer = data.name;
  currentPoints = 10;
  // Display the new question and chouces
  updateBoard();
};


