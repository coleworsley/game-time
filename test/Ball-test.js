
import { expect, assert } from 'chai';
import Ball from '../lib/Ball.js';

describe ('Ball Test', () => {
  const ball = new Ball( 10, 200, 5 );
  const canvas = {width: 100, height: 100}

  it('should be an instance of a Ball', () => {
    expect(ball).to.be.an.instanceof(Ball);
  });

  it('should have an x coordinate', () => {
    expect(ball.x).to.equal(10);
  });

  it('should have a y coordinate', () => {
    expect(ball.y).to.equal(200);
  });

  it('should have a radius', () => {
    expect(ball.radius).to.equal(5);
  });

  it('should have an x velocity of 5 by default', () => {
    expect(ball.xv).to.equal(5);
  });

  it('should have a y velocity of -5 by default', () => {
    expect(ball.yv).to.equal(-5);
  });

  it('should have a max speed of 10 by default', () => {
    expect(ball.maxSpeed).to.equal(10);
  });

  it('should move along the x and y axis', () => {
    const ball = new Ball( 50, 50, 5 );

    assert.isFunction(ball.move);
    ball.move(canvas)
    expect(ball.x).to.equal(55);
    expect(ball.y).to.equal(45);
  });


  it('should rebound off the sides of the canvas', () => {
    const ball = new Ball( 92, 25, 5 );

    // test right
    assert.isFunction(ball.reboundX);
    ball.reboundX(canvas);
    expect(ball.xv).to.equal(-5);
    expect(ball.x).to.equal(93);

    // test left
    ball.x = 7;
    ball.reboundX(canvas);
    expect(ball.xv).to.equal(5);
    expect(ball.x).to.equal(8);
  });

  it('should bounce off the top of the canvas', () => {
    const ball = new Ball( 50, 6, 5 );

    assert.isFunction(ball.reboundTop);
    ball.reboundTop();
    expect(ball.yv).to.equal(5);
    expect(ball.y).to.equal(9);
  });
});
