function Paddle (x, y, width = 60, height = 15) {
  this.x = x / 2 - width / 2;
  this.y = y;
  this.width = width;
  this.height = height;
  this.paddleImg = new Image();
}

Paddle.prototype.build = function (context) {
  // var paddleImg = new Image();
  this.paddleImg.addEventListener('load', () => {
    console.log(this)
    this.draw (context);

  })
  this.paddleImg.src = '../paddle.png';
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
  context.drawImage(this.paddleImg, this.x, this.y, this.width, this.height);
}

module.exports = Paddle;
