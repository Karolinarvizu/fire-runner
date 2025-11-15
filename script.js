let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let scoreElement = document.getElementById("score");

let jumping = false;
let score = 0;

// AUDIO
let jumpSound = new Audio("audio/jump.wav");
let loseSound = new Audio("audio/lose.wav");

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !jumping) {
    jump();
  }
});

function jump() {
  jumping = true;
  jumpSound.play();

  let jumpInterval = setInterval(() => {
    let playerBottom = parseInt(window.getComputedStyle(player).bottom);

    if (playerBottom < 120) {
      player.style.bottom = (playerBottom + 5) + "px";
    } else {
      clearInterval(jumpInterval);
      
      let downInterval = setInterval(() => {
        let playerBottom = parseInt(window.getComputedStyle(player).bottom);

        if (playerBottom > 0) {
          player.style.bottom = (playerBottom - 5) + "px";
        } else {
          clearInterval(downInterval);
          jumping = false;
        }
      }, 20);
    }
  }, 20);
}

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

function lose() {
  loseSound.play();
  alert("¡Perdiste! Puntaje final: " + score);
  score = 0;
  scoreElement.innerText = "Puntaje: 0";
}

setInterval(() => {
  score++;
  scoreElement.innerText = "Puntaje: " + score;
  checkCollision();
}, 100);

