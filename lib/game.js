var Ball = require('./Ball.js');
var Brick = require('./Brick.js');
var Paddle = require('./Paddle.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
// var bricks = [];
// var numBricks = 500;
// var moveBricks = false
// var brickSize = 6

var ballRadius = 5;
var ball = new Ball(canvas.width / 2, canvas.height - 40, ballRadius);
var paddle = new Paddle(canvas.width / 2, canvas.height - 30, 60, 15)

// for (var i = 0; i < numBricks; i++) {
//   bricks[i] = new Ball(10 + i * 10, 10 + i * 2, brickSize, brickSize);
// }


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





context.fillStyle = "rgba(0, 255, 0, 1)";


requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw(context);
  ball.move(canvas);
  paddle.draw(context)


  // for (var i = 0; i < blocks.length; i++) {
  //   let b = blocks[i];
  //
  //   if (moveBlocks) {
  //     b.move(canvas.width, canvas.height);
  //   }
  //
  //   b.draw(context);
  // }

  requestAnimationFrame(gameLoop);
});


// canvas.addEventListener('click', function (event) {
//   moveBlocks = !moveBlocks;
//   var newBlock = new Ball(event.offsetX, event.offsetY, blockSize, blockSize);
//
//   blocks.push(newBlock);
// });

document.addEventListener('keydown', function () {

});
