let player;
let playerImg;
let obs;
let obs2;
let obstacles = [];
let bg;
let wordClassifier;
let button;

let score = 0;

function preload() {
  bg = loadImage("background.jpg");
  playerImg = loadImage("player.png");
  obs = loadImage("obs.png");
  obs2 = loadImage("wamuu.png");
  let options = { probabilityThreshold: 0.85 };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(3000, 1200);
  player = new Player();
  wordClassifier.classify(heardword);
}

function restart() {
  location.reload();
}

function heardword(error, result) {
  console.log(result[0]);
  if (result[0].label === "up") {
    player.jump();
  }
}

function keyPressed() {
  if (key === " " || keyCode === UP_ARROW) {
    player.jump();
  }
}

function draw() {
  background(bg);

  if (random(1) < 0.01) {
    if (obstacles[0] == null) {
      obstacles.push(new Obstacle());
    } else if (obstacles[obstacles.length - 1].x < 100) {
      obstacles.push(new Obstacle());
    }
  }
  for (let obs of obstacles) {
    obs.show();
    obs.move();

    if (player.collided(obs) === true) {
      textSize(75);
      fill("blue");
      text("Game Over ,score = " + score, width / 2 - 200, height / 2);
      noLoop();

      button = createButton("click me to restart");
      button.size(250, 100);
      button.style("border-radius", "50px 20px");
      button.style("background-color", "#606c38");
      button.style("font-size", "30px");
      button.position(width / 2, height / 2 - 250);
      button.mousePressed(restart);
    }
    if (obs.x < -obs.size) {
      score++;
      let i = obstacles.indexOf(obs);
      obstacles.splice(i, 1);
    }
  }
  player.show();
  player.move();
}
