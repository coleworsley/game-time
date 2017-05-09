class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xv = 5;
    this.yv = -5;
    this.maxSpeed = 10;
  }

  move(canvas) {
    if (!this.reboundX(canvas)) {
      this.x += this.xv;
    }
    if (!this.reboundTop()) {
      this.y += this.yv;
    }
    return this;
  }

  reboundX(canvas) {
    let nextRight = this.x + this.radius + this.xv;
    let nextLeft = this.x - this.radius + this.xv;

    if (nextRight > canvas.width) {
      let forwardVelocity = this.xv + canvas.width - nextRight;

      this.x += forwardVelocity - (this.xv - forwardVelocity);
      this.xv = -this.xv;
      return true;

    } else if (nextLeft < 0) {
      let forwardVelocity = this.xv - nextLeft;

      this.x += forwardVelocity - (this.xv - forwardVelocity);
      this.xv = -this.xv;
      return true;
    }
    return false;
  }

  reboundTop() {
    if (this.y + this.yv < this.radius) {
      let upwards = this.yv - (this.y + this.yv - this.radius);
      let downwards = -this.yv + upwards;

      this.y += upwards + downwards;
      this.yv = -this.yv;
      return true;
    }
    return false;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = '#FFF';
    context.fill();
    context.closePath();
  }

  collision(canvas, body) {
    const ballLeft    = this.x - this.radius;
    const ballRight   = this.x + this.radius;
    const ballTop     = this.y - this.radius;
    const ballBottom  = this.y + this.radius;

    const bodyLeft    = body.x;
    const bodyRight   = body.x + body.width;
    const bodyTop     = body.y;
    const bodyBottom  = body.y + body.height;

    const xMargin = Math.abs(this.xv);
    const yMargin = Math.abs(this.yv);

    let coll =  !(ballLeft    > bodyRight   ||
                  ballRight   < bodyLeft    ||
                  ballTop     > bodyBottom  ||
                  ballBottom  < bodyTop);
    let flipX =  (ballRight   <= bodyLeft + xMargin   ||
                  ballLeft    >= bodyRight - xMargin);
    let flipY;

    if (this.y < canvas.height - 50) {
      flipY = (ballTop >= bodyBottom - yMargin ||
               ballBottom <= bodyTop + yMargin);
    } else {
      flipY = (ballBottom  <= bodyTop + yMargin);
    }

    return { collision: coll, x: flipX, y: flipY };
  }

  handlePaddleCollision(paddle) {
    let percent = (this.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);

    this.xv = percent * this.maxSpeed;
  }
}



module.exports = Ball;
