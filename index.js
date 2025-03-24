let container = document.getElementById("container");
let moletile;
let planttile;
let score = 0;
let gameOver = false;
let tiletimer;
let planttimer;
let tileInterval;
let plantInterval;

let easy = document.querySelector(".easy");
let medium = document.querySelector(".medium");
let hard = document.querySelector(".hard");

window.onload = function () {
  easy.addEventListener("click", gameMode);
  medium.addEventListener("click", gameMode);
  hard.addEventListener("click", gameMode);
};

function setgame() {
  // Clear existing tiles before creating new ones
  container.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.addEventListener("click", gameLogic);
    tile.id = i.toString();
    container.appendChild(tile);
  }

  // Clear previous intervals before setting new ones
  clearInterval(tileInterval);
  clearInterval(plantInterval);

  tileInterval = setInterval(insertMole, tiletimer);
  plantInterval = setInterval(insertPlant, planttimer);

  gameLogic();
}

function gameMode() {
  gameOver = false;
  score = 0; // Reset score on mode change
  document.querySelector(".gamescore").innerHTML = `Score : 0`;

  if (this.innerHTML == "Easy") {
    tiletimer = 2000;
    planttimer = 3000;
  } else if (this.innerHTML == "Medium") {
    tiletimer = 1000;
    planttimer = 2000;
  } else if (this.innerHTML == "Hard") {
    tiletimer = 500;
    planttimer = 1000;
  }

  setgame();
}

function getrandomtile() {
  return Math.floor(Math.random() * 9).toString();
}

function insertMole() {
  if (gameOver) return;
  if (moletile) moletile.innerHTML = "";

  let mole = document.createElement("img");
  mole.src = "monty-mole.png";
  let id = getrandomtile();
  if (planttile && planttile.id === id) return;

  moletile = document.getElementById(id);
  moletile.appendChild(mole);
}

function insertPlant() {
  if (gameOver) return;
  if (planttile) planttile.innerHTML = "";

  let plant = document.createElement("img");
  plant.src = "piranha-plant.png";
  let id = getrandomtile();
  if (moletile && moletile.id === id) return;

  planttile = document.getElementById(id);
  planttile.appendChild(plant);
}

function gameLogic() {
  if (gameOver) return;

  if (this == moletile) {
    score += 10;
    document.querySelector(".gamescore").innerHTML = `Score : ${score}`;
  } else if (this == planttile) {
    document.querySelector(".gamescore").innerHTML = `GAME OVER : ${score}`;
    gameOver = true;

    // Stop intervals when the game is over
    clearInterval(tileInterval);
    clearInterval(plantInterval);
  }
}
