// GLOBALS
const Ball = require('./Ball.js');
const Brick = require('./Brick.js');
const Paddle = require('./Paddle.js');
const Levels = require('./Levels.js');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

class Game {
  constructor() {
    this.ball = new Ball(canvas.width / 2, canvas.height - 40, 5);
    this.paddle = new Paddle(
      canvas.width / 2 - 120 / 2,
      canvas.height - 30,
      120
    );
    this.level = new Levels()
    this.state = {
      paused: true,
      score: 0,
      level: 1,
      lives: 3
    };
    this.bricks = [];
    this.brickPresets = {};
    this.sumBrickStrength = 0;
    this.keyPressed = false;
    this.paddleDirection = 0;
    this.fps = 100;
    this.previousTime = new Date();
    // this.highScore;
  }

  keyDown (e) {
    if (e.keyCode == 37) {
      this.keyPressed = true;
      this.paddleDirection = -1;
    } else if (e.keyCode == 39) {
      this.keyPressed = true;
      this.paddleDirection = 1;
    }
  }

  keyUp (e) {
    if (e.keyCode === 37 || e.keyCode === 39) {
      this.keyPressed = false;
    } else if (e.keyCode === 32 && this.state.lives < 0) {
      this.onLoad();
    } else if (e.keyCode === 32) {
      this.state.paused = !this.state.paused;
    }
  }


  onLoad () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.updateBrickLayout();
    this.loadBricks(this.state.brickCols, this.state.brickRows);
    paddle.build(context);
    drawAll();
    startText();
    updateHighScore();
    document.getElementById('dash-lives').textContent = gameState.lives;
    document.getElementById('dash-score').textContent = gameState.score;
    document.getElementById('dash-level').textContent = gameState.level;
  }
}

module.exports = Game;
