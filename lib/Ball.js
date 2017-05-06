function Ball (x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xv = 3;
  this.yv = -5;
}

Ball.prototype.move = function (canvas) {
  if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
    this.xv = -this.xv;
  }
  if (this.y - this.radius < 0) {
    this.yv = -this.yv;
  }

  this.x += this.xv
  this.y += this.yv
  return this;
}

Ball.prototype.draw = function (context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  context.fillStyle = '#FFF';
  context.fill();
  context.closePath();
}

Ball.prototype.collision = function (body) {
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
  let flipX =  (ballRight   <= bodyLeft + xMargin ||
                ballLeft    >= bodyRight - xMargin);
  let flipY =  (ballTop     >= bodyBottom - yMargin ||
                ballBottom  <= bodyTop + yMargin);

  return { collision: coll, x: flipX, y: flipY };
}

module.exports = Ball;
