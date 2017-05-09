class Level {
  constructor () {
    this.presets = [
      {rows: 3, cols: 3, strength: 1, paddleWidth: 120,
        ballXV: 5, ballYV: -5, maxSpeed: 10},
      {rows: 4, cols: 4, strength: 2, paddleWidth: 100,
        ballXV: 5, ballYV: -5, maxSpeed: 10},
      {rows: 5, cols: 5, strength: 2, paddleWidth: 80,
        ballXV: 5, ballYV: -7, maxSpeed: 10},
      {rows: 5, cols: 5, strength: 3, paddleWidth: 80,
        ballXV: 5, ballYV: -9, maxSpeed: 10},
      {rows: 6, cols: 6, strength: 3, paddleWidth: 60,
        ballXV: 5, ballYV: -10, maxSpeed: 10}
    ]
  }

  updateLevel (game) {
    let {ball, paddle, state, brickPresets} = game;
    let level = Math.min(state.level, 4);
    let {rows,
        cols,
        strength, 
        paddleWidth,
        ballXV,
        ballYV,
        maxSpeed} = this.presets[level];

    state.paused = true;
    state.level++;
    state.lives++;
    brickPresets.rows = rows;
    brickPresets.cols = cols;
    brickPresets.strength = strength;
    paddle.width = paddleWidth;
    ball.xv = ballXV;
    ball.yv = ballYV;
    ball.maxSpeed = maxSpeed
  }
}

module.exports = Level;
