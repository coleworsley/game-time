var Ball = require('./Ball.js');
var Brick = require('./Brick.js');
var Paddle = require('./Paddle.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var bricks = [];
var bCol = 6;
var bRow = 3;

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

var bColors = ['rgba(73, 13, 255, 1)', 'rgba(127, 12, 232, 1)', 'rgba(203, 0, 255, 1)'];


for (var i = 0; i < bRow; i++) {
  bricks[i] = []
  for (var j = 0; j < bCol; j++) {
    var brick = new Brick(
      j * canvas.width / bCol + j * 2,
      i * 40,
      canvas.width / bCol,
      40,
      bColors[i]
    );

    bricks[i][j] = brick;
  }
}
console.log(bricks);


/*
TODO: create ball object and write to the canvas
TODO: create paddle object and write to the canvas
TODO: create multidimensional array containing all bricks and write to canvas
  Start with 3 rows of 10 columns
  (need to add different presets for additional levels)

TODO: add collision detection function to do the following:
  identify which brick was hit in the multidimensional array
  change the status of the brick that was hits
  when canvas updates brick will not exist
  change the direction of the ball
    if hit on the x axis reverse x velocity
    if hit on the y axis reverse y velocity
  update the score
  if the ball +- size is not within the same range as the paddle when at
  the bottom of the page then run lose game function

TODO: function loseGame
  reset score and canvas

TODO: add function winLevel
  resets the board (eventually with different level layout)
  keeps current score and adds to it

TODO: function startGame()
  when player hits start begin running requestAnimationFrame
*/


requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw(context);
  ball.move(canvas);
  paddle.draw(context);
  paddle.move(canvas, delta, keyPressed);

  bricks.forEach(function(row) {
    row.forEach(function(brick) {
      brick.draw(context)
    });
  });

  collisionDetection();

  requestAnimationFrame(gameLoop);
});

document.addEventListener('keydown', function (e) {
  if (e.keyCode == 37) {
    keyPressed = true;
    delta = -1
  } else if (e.keyCode == 39) {
    keyPressed = true;
    delta = 1
  }
});

document.addEventListener('keyup', function (e) {
  if (e.keyCode == 37 || e.keyCode == 39) {
    keyPressed = false;
  }
});

function collisionDetection() {
  if (ball.y + ball.radius + 30 > canvas.height &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width) {
    ball.yv = -ball.yv;
  }
}

// BUG: on page load select the canvas
(function pageLoad() {
  canvas.focus();
}())

// document.addEventListener('keydown', function (e) {
//   // 37 left, 39 right;
//   var delta = 1;
//
//   if (e.keyCode == 37) {
//
//     delta = -1;
//   } else if (e.keyCode == 39) {
//     delta = 1;
//   } else if (e.keyCode == 32) {
//     // space bar
//     // pauseGame();
//   }
//   paddle.move(canvas, delta);
//
//   // TODO: event listener for shoot ball?
// });
