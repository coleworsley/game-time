class Level {
  constructor () {
    this.presets = [
      {rows: 3, cols: 1, strength: 1, paddleWidth: 120,
        ballXV: 5, ballYV: -5, maxSpeed: 10},
      {rows: 4, cols: 1, strength: 2, paddleWidth: 100,
        ballXV: 5, ballYV: -5, maxSpeed: 10},
      {rows: 5, cols: 1, strength: 2, paddleWidth: 80,
        ballXV: 5, ballYV: -7, maxSpeed: 10},
      {rows: 5, cols: 1, strength: 3, paddleWidth: 80,
        ballXV: 5, ballYV: -9, maxSpeed: 10},
      {rows: 6, cols: 1, strength: 3, paddleWidth: 60,
        ballXV: 5, ballYV: -10, maxSpeed: 10}
    ]
  }

  updateLevel (game) {
    let level = Math.min(game.state.level, 4);
    let {rows,
        cols,
        strength,
        paddleWidth,
        ballXV,
        ballYV,
        maxSpeed} = this.presets[level];

    game.state.paused = true;
    game.state.level++;
    game.state.lives++;
    game.brickPresets.rows = rows;
    game.brickPresets.cols = cols;
    game.brickPresets.strength = strength;
    game.paddle.width = paddleWidth;
    game.ball.xv = ballXV;
    game.ball.yv = ballYV;
    game.ball.maxSpeed = maxSpeed;
  }
}

module.exports = Level;
