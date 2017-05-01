/*
refactor
prototype change speed and direction depending on when it hit the Paddle
only change

*/


function Ball (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.xv = genRandomNum(-5, 5);
  this.yv = genRandomNum(-5, 5);
  this.width = width;
  this.height = height;
}

Ball.prototype.move = function (canvasWidth, canvasHeight) {
  if (this.x + this.width > canvasWidth || this.x < 0) {
    this.xv = -this.xv;
  }
  if (this.y + this.height > canvasHeight || this.y < 0) {
    this.yv = -this.yv;
  }
  this.x += this.xv
  this.y += this.yv
  return this;
}

Ball.prototype.draw = function (context) {
  context.fillRect(
    this.x,
    this.y,
    this.width,
    this.height
  );
}

function genRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = Ball;
