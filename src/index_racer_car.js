const speedDash = document.querySelector(".speedDash");
const scoreDash = document.querySelector(".scoreDash");
const lifeDash = document.querySelector(".lifeDash");
const container = document.getElementById("container");
const startBtn = document.querySelector(".startBtn");

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", pressKeyOn);
document.addEventListener("keyup", pressKeyOff);

let animation;
let gamePlay = false;
let player;
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function startGame(event) {
  event.preventDefault();
  console.log(gamePlay);
  var div = document.createElement("div");
  div.setAttribute("class", "playerCar");
  div.x = 425;
  div.y = 500;
  container.appendChild(div);
  gamePlay = true;
  animation = requestAnimationFrame(playGame);
  player = {
    ele: div,
    speed: 1,
    lives: 3,
    score: 0,
    enemyCars: 15,
    roadwidth: 350,
  };
  startBoard();
}

function disableBtn(btn) {
  btn.disabled = true;
}

function startBoard() {
  for (let x = 0; x < 14; x++) {
    let div = document.createElement("div");
    div.setAttribute("class", "road");
    div.style.top = x * 50 + "px";
    div.style.width = player.roadwidth + "px";
    container.appendChild(div);
  }
}

function pressKeyOn(event) {
  event.preventDefault();
  console.log(keys);
  keys[event.key] = true;
}

function pressKeyOff(event) {
  event.preventDefault();
  console.log(keys);
  keys[event.key] = false;
}

function updateDash() {
  //console.log(player);
  scoreDash.innerHTML = Math.round(player.score);
  lifeDash.innerHTML = player.lives;
  speedDash.innerHTML = Math.round(player.speed * 14);
}

function moveRoad() {
  let tempRoad = document.querySelectorAll(".road");
  console.log(tempRoad);
  let prevRoad = tempRoad[0].offsetLeft;
  for (let x = 0; x < tempRoad.lenght; x++) {
    let num = tempRoad[x].offsetTop + player.speed;
    if (num > 700) {
    }
    tempRoad[x].style.top = num + "px";
  }
}

function playGame() {
  if (gamePlay) {
    updateDash();

    ///movementcar

    moveRoad();

    if (keys.ArrowUp) {
      if (player.ele.y > 100) player.ele.y -= 1;
      player.speed = player.speed < 20 ? player.speed + 0.07 : 20;
    }
    if (keys.ArrowDown) {
      if (player.ele.y < 500) player.ele.y += 1;
      player.speed = player.speed > 0 ? player.speed - 0.2 : 0;
    }
    if (keys.ArrowRight) {
      player.ele.x += player.speed / 2;
    }
    if (keys.ArrowLeft) {
      player.ele.x -= player.speed / 2;
    }
    ///movecar

    player.ele.style.top = player.ele.y + "px";
    player.ele.style.left = player.ele.x + "px";
  }
  const animation = requestAnimationFrame(playGame);
}
