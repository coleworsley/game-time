/*
refactor
prototype change speed and direction depending on when it hit the Paddle
only change

*/


function Ball (x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xv = 3;
  this.yv = -3;
  // this.xd = 1;
  // this.yd = 1;
}

Ball.prototype.move = function (canvas) {
  if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
    this.xv = -this.xv;
  }
  if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
    this.yv = -this.yv;
  }
  this.x += this.xv
  this.y += this.yv
  return this;
}

Ball.prototype.draw = function (context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  context.fillStyle = "rgba(0, 150, 150, 1)";
  context.fill();
  context.closePath();
}

module.exports = Ball;
