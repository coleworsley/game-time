var Ball = require('./Ball.js');
var Brick = require('./Brick.js');
var Paddle = require('./Paddle.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var bricks = [];
var bCol = 10;
var bRow = 5;

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
  'rgba(224, 4, 83, 1)', 
  'rgba(255, 70, 35, 1)', 
  'rgba(255, 238, 15, 1)'
];

for (var i = 0; i < bRow; i++) {
  bricks[i] = []
  for (var j = 0; j < bCol; j++) {
    var brick = new Brick(
      j * canvas.width / bCol + j * 2,
      i * 40,
      canvas.width / bCol,
      30,
      bColors[i]
    );

    bricks[i][j] = brick;
  }
}




requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw(context);
  ball.move(canvas);
  ball.collision(paddle);
  paddle.draw(context);
  paddle.move(canvas, delta, keyPressed);

  bricks.forEach(function(row) {
    row.forEach(function(brick) {
      if (ball.collision(brick)) {
        brickCollision(brick)
      }
      brick.draw(context)
    });
  });

  if (ball.collision(paddle)) {
// TODO: refactor into separate function
    if (ball.collisionDirection(paddle).y) {
      ball.yv = -ball.yv;
    }
  }



  requestAnimationFrame(gameLoop);

});


function brickCollision (brick) {
  var direction = ball.collisionDirection(brick);
  
  console.log(direction.y)
  if (brick.lives > 0) {
    if (direction.y) {
      ball.yv = -ball.yv;
    }
    if (direction.x) {
      ball.xv = -ball.xv;
    }
  }
  brick.lives --;
}

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



/*
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
