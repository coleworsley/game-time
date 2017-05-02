/*
add properties for height, width, and coordinates on canvas
add move prototype:
  when arrow is pressed change the x coordinates
  when mouse is moved change the x coordinates to center of mouse
    Possibly add max velocity to avoid issues
*/


function Paddle (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Paddle.prototype.move = function (canvas, delta) {
  if (this.x + this.width < canvas.width && this.x > 0) {
    this.x += delta * 10;
  }
}

Paddle.prototype.draw = function (context) {
  context.fillStyle = "rgba(169, 169, 169, 1)";
  context.fillRect(this.x, this.y, this.width, this.height);
}

module.exports = Paddle;
