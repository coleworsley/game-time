// GLOBALS
let Ball = require('./Ball.js');
let Brick = require('./Brick.js');
let Paddle = require('./Paddle.js');
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let bricks = [];
let paddleWidth = 60;
let keyPressed = false;
let delta = 0; // BUG: should probably make this var name more descriptive
let fps = 100;
let previousTime = new Date();

let ball = new Ball(canvas.width / 2, canvas.height - 40, 5);
let paddle = new Paddle(canvas.width, canvas.height - 30, paddleWidth);
let gameState = {
  active: false,
  paused: true,
  score: 0,
  level: 1,
  lives: 3
}

// EVENTS
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

onLoad();

// FUNCTIONS
function onLoad () {
  loadBricks();
  paddle.build(context);
  drawAll();
  startText();
}

function startText () {
  context.fillStyle = 'rgba(223, 0, 120, .8)';
  context.fillRect(40, 300, canvas.width - 80, 50);
  context.font = "30px Arial";
  context.fillStyle = 'rgba(26, 26, 26, .5)';
  context.fillText ("Press Space to Start", 110, 335);
  document.getElementById('dash-lives').textContent = gameState.lives;
}

function drawAll () {
  ball.draw(context);
  paddle.draw(context);

  bricks.forEach(function(row) {
    let filteredRow = row.filter(function(brick) {
      return brick.strength > 0;
    });

    filteredRow.forEach(function(brick) {
      ballCollision(brick);
      brick.draw(context);
    });
  });
}

function ballCollision (obj) {  // BUG: Move this into Ball.js?
  let {collision, x, y} = ball.collision(obj);

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
    obj.opacity -= 0.35;
    obj.strength--;
    gameState.score++;
    document.getElementById('dash-score').innerText = gameState.score;
  }

  if (obj instanceof Paddle) {
    var ballCenter = ball.x;
    var paddleCenter = paddle.x + paddle.width / 2;

    ball.xv = ball.xv * ((ballCenter / paddleCenter));//need to update formula
  }
}

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
  if (e.keyCode == 37 || e.keyCode == 39) {
    keyPressed = false;
  } else if (e.keyCode == 32) {
    gameState.paused = !gameState.paused
  }
}

function loadBricks () {
  let bColors = ['rgba(11, 127, 207,',
    'rgba(4, 216, 21,',
    'rgba(223, 0, 120,',
    'rgba(255, 70, 35,',
    'rgba(255, 238, 15,'
  ];
  let bCol = 8;
  let bRow = 5;

  for (let i = 0; i < bRow; i++) {
    bricks[i] = [];
    for (let j = 0; j < bCol; j++) {
      let brick = new Brick(
        j * (canvas.width / bCol) + 1,
        i * 35,
        canvas.width / bCol - 2,
        30,
        bColors[i % 5]
      );

      bricks[i][j] = brick;
    }
  }
}

requestAnimationFrame(function gameLoop() {
  var newTime = new Date();

  if (newTime - previousTime > 1000 / fps) {
    previousTime = newTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.move(canvas);
    paddle.move(canvas, delta, keyPressed);
    ballCollision(paddle);
    drawAll();
  }
  if (ball.y > canvas.height) {
    gameState.lives--;
    resetBall();
  }

  if (gameState.paused) {
    fps = 0;
  } else {
    fps = 100;
  }

  requestAnimationFrame(gameLoop);
});

function resetBall () {
  //TODO: create new ball (or position the other one to start position)

}


/*
TODO: function loseGame
  reset score and canvas

TODO: add function winLevel
  resets the board (eventually with different level layout)
  keeps current score and adds to it
*/
