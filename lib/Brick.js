/*
add properties and parameters for height, width, and coordinates on canvas
add brick status (brick existing or not)
add multiple hits for harder mode?
*/


function Brick (x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.lives = 1;
}

Brick.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
}

module.exports = Brick;
