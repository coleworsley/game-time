var Ball = require('./Ball.js');
var Brick = require('./Brick.js');
var Paddle = require('./Paddle.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var bricks = [];

var ballRadius = 5;
var ball = new Ball(canvas.width / 2, canvas.height - 40, ballRadius);
var paddleWidth = 60;
var paddleHeight = 15
var paddle = new Paddle(canvas.width / 2 - paddleWidth / 2,
  canvas.height - 30,
  paddleWidth,
  paddleHeight);
var keyPressed = false;
var delta = 0;

var bColors = ['rgba(11, 127, 207, 1)',
  'rgba(4, 216, 21, 1)',
  'rgba(223, 0, 120, 1)',
  'rgba(255, 70, 35, 1)',
  'rgba(255, 238, 15, 1)'
];


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  ball.move(canvas);
  paddle.move(canvas, delta, keyPressed);

  ballCollision(paddle);
  drawAll();
  requestAnimationFrame(gameLoop);
});

function drawAll () {
  ball.draw(context);
  paddle.draw(context);

  bricks.forEach(function(row) {
    var filteredRow = row.filter(function(brick) {
      return brick.strength > 0;
    })

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
  let bRow = 5;

  for (let i = 0; i < bRow; i++) {
    bricks[i] = [];
    for (let j = 0; j < bCol; j++) {
      let brick = new Brick(
        j * (canvas.width / bCol) + 1,
        i * 35,
        canvas.width / bCol - 2,
        30,
        bColors[i]
      );

      bricks[i][j] = brick;
    }
  }
})();

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
