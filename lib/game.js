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
  'rgba(223, 0, 120, 1)',
  'rgba(255, 70, 35, 1)',
  'rgba(255, 238, 15, 1)'
];

for (var i = 0; i < bRow; i++) {
  bricks[i] = []
  for (var j = 0; j < bCol; j++) {
    var brick = new Brick(
      j * (canvas.width / bCol) + 1,
      i * 35,
      canvas.width / bCol - 2,
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
    var filteredRow = row.filter(function(brick) {
      return brick.strength > 0;
    })

    filteredRow.forEach(function(brick) {
      if (ball.collision(brick)) {
        brickCollision(brick)
      }
      brick.draw(context)


    });
  });

  if (ball.collision(paddle)) {
    paddleCollision();
  }

    requestAnimationFrame(gameLoop);

});


function paddleCollision () {
  var direction = ball.collisionDirection(paddle);

  if (direction.y) {
    ball.yv = -ball.yv;
  }

  if (direction.x) {
    ball.xv = -ball.xv;
  }
}

function brickCollision (brick) {
  var direction = ball.collisionDirection(brick);

  console.log('x: ' + direction.x, 'y: ' + direction.y)
  if (direction.x) {
    ball.xv = -ball.xv;
  }
  if (direction.y) {
    ball.yv = -ball.yv;
  }
  brick.strength --;
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
