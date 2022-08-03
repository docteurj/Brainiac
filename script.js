const fire = document.querySelector('#rock')
const water = document.querySelector('#paper')
const grass = document.querySelector('#scissor')

const computer = [fire,water,grass ];


document.getElementById("rock").addEventListener("click", function() {
   console.log(cpu(computer));
});

document.getElementById("paper").addEventListener("click", function() {
   console.log(cpu(computer));
});

document.getElementById("scissor").addEventListener("click", function() {
   console.log(cpu(computer));
});

function cpu(computer){
  return computer[Math.floor(Math.random() * computer.length)];
}


