import { expect, assert } from 'chai';
import Paddle from '../lib/Paddle.js';

describe ('Paddle Test', () => {
  const paddle = new Paddle(10, 20, 30);
  
  it('should be an instance of Paddle', () => {
    expect(paddle).to.be.an.instanceof(Paddle);
  });
  
  it('should have an x coordinate', () => {
    expect(paddle.x).to.equal(10);
  });

  it('should have a y coordinate', () => {
    expect(paddle.y).to.equal(20);
  });
  
  it('should have a width', () => {
    expect(paddle.width).to.equal(30);
  });
  
  it('should have a height', () => {
    expect(paddle.height).to.equal(15);
  });
  
  it('should have a height', () => {
    expect(paddle.paddleSpeed).to.equal(8);
  });
  
  it('should have a function called "move"', () => {
    assert.isFunction(paddle.move);
  });
  
  it('should move left if left arrow is pressed', () => {
    const paddle = new Paddle(10, 20, 30);

    paddle.move({width: 600}, -1, true);
    expect(paddle.x).to.equal(2);
  });

  it('should move right if right arrow is pressed', () => {
    const paddle = new Paddle(10, 20, 30);

    paddle.move({width: 600}, 1, true);
    expect(paddle.x).to.equal(18);
  });
  
  it('should not move off the left side of the canvas', () => {
    const paddle = new Paddle(5, 20, 30);

    paddle.move({ width: 600 }, -1, true);
    expect(paddle.x).to.equal(0);
  });

  it('should not move off the right side of the canvas', () => {
    const paddle = new Paddle(565, 20, 30);

    paddle.move({ width: 600 }, 1, true);
    expect(paddle.x).to.equal(570);
  });
  
  it('should have a function called "draw"', () => {
    assert.isFunction(paddle.draw);
  });
});