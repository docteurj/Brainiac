const fire = document.querySelector('#rock');
const water = document.querySelector('#paper');
const grass = document.querySelector('#scissor');
let score = 0;
let computerScore = 0;
const computer = [fire, water, grass];
let playerResults = document.querySelector('#Rplayer');
let computerResults = document.querySelector('#Rcomputer');
let computerChoice = document.querySelector('#Cchoice');
let playerChoice = document.querySelector('#Pchoice');

// fire

function cpu(computer) {
  return computer[Math.floor(Math.random() * computer.length)];
}

fire.addEventListener("click", function() {
  if (cpu(computer) === fire) {
    computerChoice.textContent = "Fire"
  }
  else if (cpu(computer) === water) {
    for (let i = 1; i <= 1; i++) {
      computerScore = computerScore + i;
      computerChoice.textContent = "Water"
    }
  }
  else if (cpu(computer) === grass) {
    for (let i = 1; i <= 1; i++) {
      score = score + i;
      computerChoice.textContent = "Grass"
    }
  }
  playerResults.textContent = score
  computerResults.textContent = computerScore
  playerChoice.textContent = "Fire"
});


// water

water.addEventListener("click", function() {
  if (cpu(computer) === fire) {
    for (let i = 1; i <= 1; i++) {
      score = score + i;
      computerChoice.textContent = "Fire"
    }
  }
  else if (cpu(computer) === water) {
    computerChoice.textContent = "Water"
  }
  else if (cpu(computer) === grass) {
    for (let i = 1; i <= 1; i++) {
      computerScore = computerScore + i;
      computerChoice.textContent = "Grass"
    }
  }
  playerResults.textContent = score
  computerResults.textContent = computerScore
  playerChoice.textContent = "Water"
});

// grass

grass.addEventListener("click", function() {
  if (cpu(computer) === fire) {
    for (let i = 1; i <= 1; i++) {
      computerScore = computerScore + i;
      computerChoice.textContent = "Fire"
    }
  }
  else if (cpu(computer) === water) {
    for (let i = 1; i <= 1; i++) {
      score = score + i;
      computerChoice.textContent = "Water"
    }
  }
  else if (cpu(computer) === grass) {
    computerChoice.textContent = "Grass"
  }
  playerResults.textContent = score
  computerResults.textContent = computerScore
  playerChoice.textContent = "Grass"
});




