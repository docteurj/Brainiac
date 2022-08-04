`use strict`;
alert("You have 5 strikes! See how far you can get!")
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

let questionBoard = {
  name: "doctor doom",
  currentPoints: 10,
  currentScore: 0,
  currentStrike: 0,
  currentImg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/222-doctor-doom.jpg"
};

// Default variables 
let currentAnswer = "doctor doom";
let currentPoints = 10;
let currentScore = 0;
let currentStrike = 0;
let currentImg = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/222-doctor-doom.jpg"

const validIds = [];


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
    answerInputBox.value = "";
  } else {
    alert("Incorrect!")
    currentStrike += 1;
    updateBoard()
    answerInputBox.value = "";
  }

  if (currentStrike == 5) {
    answerInputBox.value = "";
    alert("Your total score was " + currentScore + "! This character's name is " + currentAnswer + "!");
    currentAnswer = "Doctor Doom";
    currentPoints = 10;
    currentScore = 0;
    currentStrike = 0;
    currentImg = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/222-doctor-doom.jpg"
    updateBoard()
  }
};

submitButton.addEventListener("click", checkAnswer);


heroButton.addEventListener("click", e => {
  currentStrike += 1;
  updateBoard()
  getNextHero()
  updateBoard()
  if (currentStrike == 5) {
    alert("Your total score was " + currentScore + "!");
    currentScore = 0;
    currentStrike = 0;
    getNextHero()
    updateBoard()
  }
})

const VALID_IDS = [];

const getIDs = async () => {
  const myQuery = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";
  const response = await fetch(myQuery);
  const data = await response.json();
  data.forEach(d => {
    VALID_IDS[VALID_IDS.length] = d.id;
  });
  console.log(VALID_IDS);
};

getIDs();

// API data for the three question buttons on screen.
//Get the next hero
const getNextHero = async () => {
  console.log(VALID_IDS);
  const i = randomInt(VALID_IDS.length);
  const id = VALID_IDS[i];
  const myQuery = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`;
  const response = await fetch(myQuery);
  const data = await response.json();
  updateWithNewData(data);
  answerInputBox.value = "";
  console.log(data)

};


resetButton.addEventListener("click", e => {
  alert("Your total score was " + currentScore + "!");
  currentScore = 0;
  currentStrike = 0;
  getNextHero()
  updateBoard()
})

const updateWithNewData = (data) => {
  // Update variables with new data
  currentImg = data.images.md;
  currentAnswer = data.name;
  currentPoints = 10;
  // Display the new question and chouces
  updateBoard();
};
