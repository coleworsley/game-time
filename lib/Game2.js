// GLOBALS
const Ball = require('./Ball.js');
const Brick = require('./Brick.js');
const Paddle = require('./Paddle.js');
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
    this.state = {
      paused: true,
      score: 0,
      level: 1,
      lives: 3
    };
    this.bricks = [];
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
    this.runPresets();
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





//PRESETS//
  updateLevel () {
    this.state.paused = true;
    this.state.level++;
    this.state.lives++;
    this.runPresets();
  }

  runPresets () {
    this.updateBrickLayout();
    this.updatePaddleWidth();
    this.updateBallSpeed();
  }

  updateBrickLayout () {
    let brickPresets = [
      {rows: 3, cols: 3, strength: 1},
      {rows: 4, cols: 4, strength: 2},
      {rows: 5, cols: 5, strength: 2},
      {rows: 5, cols: 5, strength: 3},
      {rows: 6, cols: 6, strength: 3},
    ];
    let level = this.updateLevelHandler (brickPresets.length);

    this.state.brickRows = brickPresets[level].rows;
    this.state.brickCols = brickPresets[level].cols;
    this.state.brickStrength = brickPresets[level].strength;
  }

  updatePaddleWidth () {
    let paddlePresets = [
      {width: 120},
      {width: 100},
      {width: 80},
      {width: 80},
      {width: 60}
    ];
    let level = updateLevelHandler (paddlePresets.length);

    this.paddle.width = paddlePresets[level].width;
  }

  function updateBallSpeed () {
    let ballPresets = [
      {xv: 5, yv: -5, maxSpeed: 10},
      {xv: 5, yv: -5, maxSpeed: 10},
      {xv: 5, yv: -7, maxSpeed: 12},
      {xv: 5, yv: -9, maxSpeed: 12},
      {xv: 5, yv: -10, maxSpeed: 14}
    ];
    let level = updateLevelHandler (ballPresets.length);

    ball.xv = ballPresets[level].xv;
    ball.yx = ballPresets[level].yv;
    ball.maxSpeed = ballPresets[level].maxSpeed;
  }

  function updateLevelHandler (arrayLength) {
    if (gameState.level > arrayLength) {
      return arrayLength;
    } else {
      return gameState.level - 1;
    }
  }

}

module.exports = Game;
