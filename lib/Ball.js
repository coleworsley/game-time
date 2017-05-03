function Ball (x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xv = 3;
  this.yv = -2;

}

Ball.prototype.move = function (canvas) {
  // canvas boundaries
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
  context.fillStyle = '#FFF';
  context.fill();
  context.closePath();
}

Ball.prototype.collision = function (body) {
  return !(this.x - this.radius > body.x + body.width ||
           this.x + this.radius < body.x ||
           this.y - this.radius > body.y + body.height ||
           this.y + this.radius < body.y
  );
}

Ball.prototype.collisionDirection = function (body) {
  var ballLeft = this.x - this.radius;
  var ballRight = this.x + this.radius;
  var ballTop = this.y - this.radius;
  var ballBottom = this.y + this.radius;

  var bodyLeft = body.x + Math.abs(this.xv);
  var bodyRight = body.x + body.width - Math.abs(this.xv);
  var bodyTop = body.y + Math.abs(this.yv);
  var bodyBottom = body.y + body.height - Math.abs(this.yv);


  // flip direction here
  var flipX = (ballRight < bodyLeft || ballLeft > bodyRight)
  var flipY = (ballTop >= bodyBottom || ballBottom <= bodyTop)

  console.log('ballRight = ' + ballRight)
  console.log('ballLeft = ' + ballLeft)
  console.log('ballTop = ' + ballTop)
  console.log('ballBottom = ' + ballBottom)
  console.log('bodyRight = ' + bodyRight)
  console.log('bodyLeft = ' + bodyLeft)
  console.log('bodyTop = ' + bodyTop)
  console.log('bodyBottom = ' + bodyBottom)
  return { x: flipX, y: flipY }
};

module.exports = Ball;
