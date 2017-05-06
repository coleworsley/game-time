function Brick (x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.opacity = 1;
  this.strength = 3;
}

Brick.prototype.draw = function (context) {
  context.fillStyle = this.color + this.opacity + ')';
  context.fillRect(this.x, this.y, this.width, this.height);
}

module.exports = Brick;
