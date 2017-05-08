import { expect } from 'chai';
import Ball from '../lib/Ball.js';

describe ('Ball Test', () => {
  const ball = new Ball( 5, 200, 15 );

  it('should be an instance of a Ball', () => {
    expect(ball).to.be.an.instanceof(Ball);
  });

  it('should have an x coordinate', () => {
    expect(ball.x).to.equal(5);
  });

  it('should have a y coordinate', () => {
    expect(ball.y).to.equal(200);
  });

  it('should have a radius', () => {
    expect(ball.radius).to.equal(15);
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


});
