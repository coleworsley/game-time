function Brick (x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.opacity = 1;
  this.color = color;
  this.strength = 2;
}

Brick.prototype.draw = function (context) {
  context.fillStyle = this.color + this.opacity + ')';
  context.fillRect(this.x, this.y, this.width, this.height);
}

module.exports = Brick;
