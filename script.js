let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let scoreElement = document.getElementById("score");
let startText = document.getElementById("startText");

let jumping = false;
let score = 0;
let gameStarted = false;
let intervalId = null;

// AUDIO
let jumpSound = new Audio("audio/jump.wav");
let loseSound = new Audio("audio/lose.wav");

// IMÁGENES DE OBSTÁCULOS
const obstacleImages = [
  "img/cactus.png",
  "img/mushroom_brown.png",
  "img/spike_top.png"
];

// Cambiar obstáculo
function randomObstacle() {
  let r = Math.floor(Math.random() * obstacleImages.length);
  obstacle.style.backgroundImage = `url(${obstacleImages[r]})`;
}

// ----- SALTO -----
function jump() {
  if (jumping) return;
  jumping = true;
  jumpSound.play();

  let upInterval = setInterval(() => {
    let bottom = parseInt(window.getComputedStyle(player).bottom);

    if (bottom < 120) {
      player.style.bottom = (bottom + 5) + "px";
    } else {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        let bottom = parseInt(window.getComputedStyle(player).bottom);

        if (bottom > 0) {
          player.style.bottom = (bottom - 5) + "px";
        } else {
          clearInterval(downInterval);
          jumping = false;
        }
      }, 20);
    }
  }, 20);
}

// ----- COLISIÓN -----
function checkCollision() {
  let playerRect = player.getBoundingClientRect();
  let obstacleRect = obstacle.getBoundingClientRect();

  if (
    playerRect.right > obstacleRect.left &&
    playerRect.left < obstacleRect.right &&
    playerRect.bottom > obstacleRect.top
  ) {
    lose();
  }
}

// ----- PERDER -----
function lose() {
  loseSound.play();

  // Mostrar pantalla de Game Over
  document.getElementById("gameOver").style.display = "block";
  document.getElementById("finalScore").innerText = "Puntaje final: " + score;

  // Reset visual
  obstacle.style.animation = "none";
  clearInterval(intervalId);

  gameStarted = false;
}


// ----- INICIAR JUEGO -----
function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  startText.style.display = "none";
  startText.style.display = "none";
  instructions.style.display = "none";


  randomObstacle();
  obstacle.style.animation = "move 1.5s infinite linear";

  obstacle.addEventListener("animationiteration", () => {
    randomObstacle();
  });

  intervalId = setInterval(() => {
    score++;
    scoreElement.innerText = "Puntaje: " + score;
    checkCollision();
  }, 100);
}

// ----- EVENTOS -----
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    if (!gameStarted) startGame();
    else jump();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "r" || e.key === "R") {
    if (!gameStarted) {
      score = 0;
      scoreElement.innerText = "Puntaje: 0";
      document.getElementById("gameOver").style.display = "none";
      startGame();
    }
  }
});

