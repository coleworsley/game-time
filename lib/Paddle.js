function Paddle (x, y, width = 60, height = 15) {
  this.x = x / 2 - width / 2;
  this.y = y;
  this.width = width;
  this.height = height;
}

Paddle.prototype.move = function (canvas, delta, keyPressed) {
  if (keyPressed) {
    if (this.x > 0 && delta === -1) {
      this.x += delta * 5;
    }

    if (this.x + this.width < canvas.width && delta === 1) {
      this.x += delta * 5;
    }
  }
}

Paddle.prototype.draw = function (context) {
  context.fillStyle = '#CCC';
  context.fillRect(this.x, this.y, this.width, this.height);
}

module.exports = Paddle;
