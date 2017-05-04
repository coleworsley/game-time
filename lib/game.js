// GLOBALS
let Ball = require('./Ball.js');
let Brick = require('./Brick.js');
let Paddle = require('./Paddle.js');

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let paddleWidth = 60;
let keyPressed = false;
let delta = 0;
let bColors = ['rgba(11, 127, 207,',
  'rgba(4, 216, 21,',
  'rgba(223, 0, 120,',
  'rgba(255, 70, 35,',
  'rgba(255, 238, 15,'
];

let bricks = [];
let ball = new Ball(canvas.width / 2, canvas.height - 40, 5);
let paddle = new Paddle(canvas.width,
  canvas.height - 30,
  paddleWidth
);


// ON LOAD
  // call newGame* function


// EVENTS
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


// FUNCTIONS
function drawAll () {
  ball.draw(context);
  paddle.draw(context);

  bricks.forEach(function(row) {
    let filteredRow = row.filter(function(brick) {
      return brick.strength > 0;
    });

    filteredRow.forEach(function(brick) {
      ballCollision(brick)
      brick.draw(context)
    });
  });
}

function ballCollision (obj) {
  let {collision, x, y} = ball.collision(obj)

  if (collision) {
    if (x) {
      ball.xv = -ball.xv
    }
    if (y) {
      ball.yv = -ball.yv
    }
    if (obj instanceof Brick) {
      obj.opacity -= 0.35;
      obj.strength--;
    }
  }
}

function keyDown (e) {
  if (e.keyCode == 37) {
    keyPressed = true;
    delta = -1
  } else if (e.keyCode == 39) {
    keyPressed = true;
    delta = 1
  }
}

function keyUp (e) {
  if (e.keyCode == 37 || e.keyCode == 39) {
    keyPressed = false;
  }
}

(function loadBricks () {
  let bCol = 10;
  let bRow = 7;

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
})();

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  ball.move(canvas);
  paddle.move(canvas, delta, keyPressed);

  ballCollision(paddle);
  drawAll();
  requestAnimationFrame(gameLoop);
});

/*
TODO: function loseGame
  reset score and canvas

TODO: add function winLevel
  resets the board (eventually with different level layout)
  keeps current score and adds to it

TODO: function startGame()
  when player hits start begin running requestAnimationFrame

TODO: function for speed based on frame rates
new time - old time = duration
duration > FPS {
  Animate
  Reset Old time
}
*/
