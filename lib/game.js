// GLOBALS
const Ball = require('./Ball.js');
const Brick = require('./Brick.js');
const Paddle = require('./Paddle.js');
const Level = require('./Level.js');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

class Game {
  constructor () {
    this.ball = new Ball(canvas.width / 2, canvas.height - 40, 5);
    this.level = new Level()
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
    this.brickPresets = {};
    this.sumBrickStrength = 0;
    this.keyPressed = false;
    this.paddleDirection = 0;
    this.fps = 100;
    this.previousTime = new Date();
    this.highScore;
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
    this.paddle.build(context);
    this.drawAll();
    this.startText();
    this.updateHighScore();
    document.getElementById('dash-lives').textContent = this.state.lives;
    document.getElementById('dash-score').textContent = this.state.score;
    document.getElementById('dash-level').textContent = this.state.level;
  }

  drawAll () {
    this.ball.draw(context);
    this.paddle.draw(context);
    this.sumBrickStrength = 0;

    this.bricks.forEach(function(row) {
      let filteredRow = row.filter(function(brick) {
        this.sumBrickStrength += brick.strength;
        return brick.strength > 0;
      });

      filteredRow.forEach(function(brick) {
        this.ballCollision(canvas, brick);
        brick.draw(context);
      });
    });
  }

  ballCollision (canvas, obj) {
    let {collision, x, y} = this.ball.collision(canvas, obj);

    if (collision) {
      if (x) {
        this.ball.xv = -this.ball.xv;
      }
      if (y) {
        this.ball.yv = -this.ball.yv;
      }
      this.collidedWith(obj);
    }
  }

  collidedWith (obj) {
    if (obj instanceof Brick) {
      obj.handleCollision();
      this.state.score++;
      document.getElementById('dash-score').innerText = this.state.score;
      if (this.sumBrickStrength === 1) {
        this.winLevel();
      }
    }

    if (obj instanceof Paddle) {
      this.ball.handlePaddleCollision(this.paddle);
    }
  }

  loadBricks (bCol, bRow) {
    const bColors = ['rgba(11, 127, 207,',
      'rgba(4, 216, 21,',
      'rgba(223, 0, 120,',
      'rgba(255, 70, 35,',
      'rgba(255, 238, 15,'
    ];

    for (let i = 0; i < bRow; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < bCol; j++) {
        let brick = new Brick(
          j * (canvas.width / bCol) + 1,
          i * 35,
          canvas.width / bCol - 2,
          30,
          bColors[i % 5],
          this.state.brickStrength
        );

        this.bricks[i][j] = brick;
      }
    }
  }

  checkPaused () {
    this.state.paused ? this.fps = 0 : this.fps = 100;
  }

  winLevel () {
    this.level.updateLevel(this)
    this.resetBallPaddle();
    this.onLoad();
  }

  resetBallPaddle () {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 40;
    this.paddle.x = canvas.width / 2 - this.paddle.width / 2;

    context.clearRect(0, 400, canvas.width, canvas.height - 400);
    this.ball.draw(context);
    this.paddle.draw(context);
  }

  startText () {
    context.fillStyle = 'rgba(223, 0, 120, .8)';
    context.fillRect(40, 275, canvas.width - 80, 130);
    context.font = 'bold 30px Arial';
    context.textAlign = 'center';
    context.fillStyle = 'rgba(26, 26, 26, .5)';
    context.fillText ('press space to launch', 250, 320);
    context.fillText('|<-| |->| move paddle', 250, 375);
  }

  gameOver () {
    context.fillStyle = 'rgba(223, 0, 120, .8)';
    context.fillRect(40, 275, canvas.width - 80, 130);
    context.font = 'bold 30px Arial';
    context.fillStyle = 'rgba(26, 26, 26, .5)';
    context.textAlign = 'center';
    context.fillText ('GAME OVER ¯\\_(ツ)_/¯', 250, 325);
    context.fillText('press space to reset', 250, 375);
    this.state.paused = true;
    this.updateHighScore();
  }

  updateHighScore () {
    let highScore = JSON.parse(localStorage.getItem('storedHighScore'));

    if (highScore < this.state.score || !highScore) {
      this.highScore = this.state.score;
    }
    localStorage.setItem('storedHighScore', JSON.stringify(this.highScore));
    document.getElementById('dash-high-score').textContent = this.highScore;
  }
}

module.exports = Game;
