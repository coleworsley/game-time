// GLOBALS
let Ball = require('./Ball.js');
let Brick = require('./Brick.js');
// import Brick from './Brick.js'
let Paddle = require('./Paddle.js');
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let bricks = [];
let sumBrickStrength = 0;
let paddleWidth = 120;
let keyPressed = false;
let delta = 0; // BUG: should probably make this var name more descriptive
let highScore;
let fps = 100;
let previousTime = new Date();

let ball = new Ball(canvas.width / 2, canvas.height - 40, 5);
let paddle = new Paddle(
  canvas.width / 2 - paddleWidth / 2,
  canvas.height - 30,
  paddleWidth
);

// let startingLives = 0;
let gameState = {
  paused: true,
  score: 0,
  level: 1,
  lives: 3,
}

// ON LOAD
onLoad();


// EVENTS
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


// FUNCTIONS
function keyDown (e) {
  if (e.keyCode == 37) {
    keyPressed = true;
    delta = -1;
  } else if (e.keyCode == 39) {
    keyPressed = true;
    delta = 1;
  }
}

function keyUp (e) {
  if (e.keyCode === 37 || e.keyCode === 39) {
    keyPressed = false;
  } else if (e.keyCode === 32 && gameState.lives < 0) {
    onLoad(gameState);
  } else if (e.keyCode === 32) {
    gameState.paused = !gameState.paused;
  }
}

function onLoad () {
  runPresets()
  context.clearRect(0, 0, canvas.width, canvas.height);
  updateBrickLayout();
  loadBricks(gameState.brickCols, gameState.brickRows);
  paddle.build(context);
  drawAll();
  startText();
  updateHighScore();
  document.getElementById('dash-lives').textContent = gameState.lives;
  document.getElementById('dash-score').textContent = gameState.score;
  document.getElementById('dash-level').textContent = gameState.level;
}

function drawAll () {
  ball.draw(context);
  paddle.draw(context);
  sumBrickStrength = 0;

  bricks.forEach(function(row) {
    let filteredRow = row.filter(function(brick) {
      sumBrickStrength += brick.strength;
      return brick.strength > 0;
    });

    filteredRow.forEach(function(brick) {
      ballCollision(canvas, brick);
      brick.draw(context);
    });
  });
}

function ballCollision (canvas, obj) {  // BUG: Move this into Ball.js?
  let {collision, x, y} = ball.collision(canvas, obj);

  if (collision) {
    if (x) {
      ball.xv = -ball.xv;
    }
    if (y) {
      ball.yv = -ball.yv;
    }
    collidedWith(obj)
  }
}

function collidedWith (obj) {
  if (obj instanceof Brick) {
    obj.handleCollision()
    gameState.score++;
    document.getElementById('dash-score').innerText = gameState.score;
    if (sumBrickStrength === 1) {
      winLevel();
    }
  }

  if (obj instanceof Paddle) {
    ball.handlePaddleCollision(paddle);
  }
}


function loadBricks (bCol, bRow) {
  let bColors = ['rgba(11, 127, 207,',
    'rgba(4, 216, 21,',
    'rgba(223, 0, 120,',
    'rgba(255, 70, 35,',
    'rgba(255, 238, 15,'
  ];

  for (let i = 0; i < bRow; i++) {
    bricks[i] = [];
    for (let j = 0; j < bCol; j++) {
      let brick = new Brick(
        j * (canvas.width / bCol) + 1,
        i * 35,
        canvas.width / bCol - 2,
        30,
        bColors[i % 5],
        gameState.brickStrength
      );

      bricks[i][j] = brick;
    }
  }
}

function checkPaused () {
  gameState.paused ? fps = 0 : fps = 100;
}

function winLevel () {
  updateLevel()
  resetBallPaddle();
  onLoad(gameState);
}

function resetBallPaddle () {
  // will need to refactor
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 40;
  paddle.x = canvas.width / 2 - paddleWidth / 2;

  context.clearRect(0, 400, canvas.width, canvas.height - 400);
  ball.draw(context);
  paddle.draw(context);
}

function gameOver() {
  context.fillStyle = 'rgba(223, 0, 120, .8)';
  context.fillRect(40, 275, canvas.width - 80, 130);
  context.font = "bold 30px Arial";
  context.fillStyle = 'rgba(26, 26, 26, .5)';
  context.textAlign = "center";
  context.fillText ("GAME OVER ¯\\_(ツ)_/¯", 250, 325);
  context.fillText("press space to reset", 250, 375);
  gameState.paused = true;
  updateHighScore();
}

function updateHighScore () {
  highScore = JSON.parse(localStorage.getItem('storedHighScore'));

  if (highScore < gameState.score || !highScore) {
    highScore = gameState.score
  }
  localStorage.setItem('storedHighScore', JSON.stringify(highScore));
  document.getElementById('dash-high-score').textContent = highScore;
}


function startText () {
  context.fillStyle = 'rgba(223, 0, 120, .8)';
  context.fillRect(40, 275, canvas.width - 80, 70);
  context.font = "bold 30px Arial";
  context.textAlign = "center";
  context.fillStyle = 'rgba(26, 26, 26, .5)';
  context.fillText ("press space to launch", 250, 320);
}

function updateLevel () {
  gameState.paused = true;
  gameState.level++;
  gameState.lives++;
  runPresets();
}

function runPresets () {
  updateBrickLayout();
  updatePaddleWidth();
  updateBallSpeed();
}

function updateBrickLayout () {
  let brickPresets = [
    {rows: 3, cols: 3, strength: 1},
    {rows: 4, cols: 4, strength: 2},
    {rows: 5, cols: 5, strength: 2},
    {rows: 5, cols: 5, strength: 3},
    {rows: 6, cols: 6, strength: 3},
  ]
  let level = updateLevelHandler (brickPresets.length);

  gameState.brickRows = brickPresets[level].rows;
  gameState.brickCols = brickPresets[level].cols;
  gameState.brickStrength = brickPresets[level].strength;
}

function updatePaddleWidth () {
  let paddlePresets = [
    {width: 120},
    {width: 100},
    {width: 80},
    {width: 80},
    {width: 60}
  ]
  let level = updateLevelHandler (paddlePresets.length);

  paddle.width = paddlePresets[level].width;
}

function updateBallSpeed () {
  let ballPresets = [
    {xv: 5, yv: -5, maxSpeed: 10},
    {xv: 5, yv: -5, maxSpeed: 10},
    {xv: 5, yv: -7, maxSpeed: 12},
    {xv: 5, yv: -9, maxSpeed: 12},
    {xv: 5, yv: -10, maxSpeed: 14}
  ]
  let level = updateLevelHandler (ballPresets.length);

  ball.xv = ballPresets[level].xv;
  ball.yx = ballPresets[level].yv;
  ball.maxSpeed = ballPresets[level].maxSpeed;
}

function updateLevelHandler (arrayLength) {
  if (gameState.level > arrayLength) {
    return arrayLength;
  } else {
    return gameState.level - 1;
  }
}

requestAnimationFrame(function gameLoop() {
  var newTime = new Date();

  if (newTime - previousTime > 1000 / fps) {
    previousTime = newTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.move(canvas);
    paddle.move(canvas, delta, keyPressed);
    ballCollision(canvas, paddle);
    drawAll();

    if (ball.y - ball.radius > canvas.height && gameState.lives > 0) {
      gameState.paused = !gameState.paused;
      gameState.lives--;
      document.getElementById('dash-lives').innerText = gameState.lives;
      resetBallPaddle();
    } else if (ball.y - ball.radius > canvas.height && gameState.lives === 0) {
      gameState.lives--;
      resetBallPaddle();
      gameOver();
    }
  }

  checkPaused();
  requestAnimationFrame(gameLoop);
});
