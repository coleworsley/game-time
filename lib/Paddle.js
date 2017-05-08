class Paddle {
  constructor(x, y, width, height = 15) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.paddleSpeed = 8;
  }
  
  build(context) {
    this.paddleImg = new Image();
    this.paddleImg.addEventListener('load', () => this.draw (context));
    this.paddleImg.src = '../paddle.png';
  }
  
  move(canvas, delta, keyPressed) {
    if (keyPressed) {
      if (this.x > this.paddleSpeed && delta === -1) {
        this.x += delta * this.paddleSpeed;
      } else if (this.x > 0 && delta === -1) {
        this.x = 0;
      }
      
      if (this.x + this.width <= canvas.width - this.paddleSpeed 
          && delta === 1) {
        this.x += delta * this.paddleSpeed;
      } else if (this.x + this.width > canvas.width - this.paddleSpeed 
                 && delta === 1) {
        this.x = canvas.width - this.width;
      }
    }
  }
  
  draw(context) {
    context.drawImage(this.paddleImg, this.x, this.y, this.width, this.height);
  }
}

module.exports = Paddle;