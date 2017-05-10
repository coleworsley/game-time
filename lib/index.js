require('./styles.css');
const Game = require('./Game.js');
const game = new Game ();

game.onLoad();

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let previousTime = new Date();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown (e) {
  if (e.keyCode == 37) {
    game.keyPressed = true;
    game.paddleDirection = -1;
  } else if (e.keyCode == 39) {
    game.keyPressed = true;
    game.paddleDirection = 1;
  }
}

function keyUp (e) {
  if (e.keyCode === 37 || e.keyCode === 39) {
    game.keyPressed = false;
  } else if (e.keyCode === 32 && game.state.lives < 0) {
    game.onLoad();
  } else if (e.keyCode === 32) {
    game.state.paused = !game.state.paused;
  }
}


requestAnimationFrame(function gameLoop() {
  var newTime = new Date();

  if (newTime - previousTime > 1000 / game.fps) {
    previousTime = newTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.ball.move(canvas);
    game.paddle.move(canvas, game.paddleDirection, game.keyPressed);
    game.ballCollision(canvas, game.paddle);
    game.drawAll();

    if (game.ball.y - game.ball.radius > canvas.height &&
      game.state.lives > 0) {
      game.state.paused = !game.state.paused;
      game.state.lives--;
      document.getElementById('dash-lives').innerText = game.state.lives;
      game.resetBallPaddle();
    } else if (game.ball.y - game.ball.radius > canvas.height &&
        game.state.lives === 0) {
      game.state.lives--;
      game.resetBallPaddle();
      game.gameOver();
    }
  }

  game.checkPaused();
  requestAnimationFrame(gameLoop);
});
