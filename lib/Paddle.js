function Paddle (x, y, width, height = 15) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.paddleSpeed = 8;
  this.paddleImg = new Image();
}

Paddle.prototype.build = function (context) {
  this.paddleImg.addEventListener('load', () => this.draw (context))
  this.paddleImg.src = '../paddle.png';
}

Paddle.prototype.move = function (canvas, delta, keyPressed) {
  if (keyPressed) {
    if (this.x > 0 && delta === -1) {
      this.x += delta * this.paddleSpeed;
    }

    if (this.x + this.width < canvas.width && delta === 1) {
      this.x += delta * this.paddleSpeed;
    }
  }
}

Paddle.prototype.draw = function (context) {
  context.drawImage(this.paddleImg, this.x, this.y, this.width, this.height);
}

module.exports = Paddle;
