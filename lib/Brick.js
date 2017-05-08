function Brick (x, y, width, height, color, strength) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.opacity = 1;
  this.strength = strength;
}

Brick.prototype.draw = function (context) {
  context.fillStyle = this.color + this.opacity + ')';
  context.fillRect(this.x, this.y, this.width, this.height);
}

Brick.prototype.handleCollision = function () {
  this.opacity -= .35;
  this.strength--;
}

module.exports = Brick;
