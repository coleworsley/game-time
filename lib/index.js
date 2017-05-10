require('./styles.css');
const Game = require('./Game.js');
const game = new Game ();

game.onLoad();

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let previousTime = new Date();

document.addEventListener('keydown', game.keyDown);
document.addEventListener('keyup', game.keyUp);


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
