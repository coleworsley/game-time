import { expect, assert } from 'chai';
import Brick from '../lib/Brick.js';

describe ('Brick Test', () => {
  const brick = new Brick( 5, 10, 40, 20, 'blue', 3);

  it('should be an instance of Brick', () => {
    expect(brick).to.be.an.instanceof(Brick);
  });

  it('should have an x coordinate', () => {
    expect(brick.x).to.equal(5);
  });

  it('should have an y coordinate', () => {
    expect(brick.y).to.equal(10);
  });

  it('should have a width', () => {
    expect(brick.width).to.equal(40);
  });

  it('should have a height', () => {
    expect(brick.height).to.equal(20);
  });

  it('should have a color', () => {
    expect(brick.color).to.equal('blue');
  });

  it('should have an opacity', () => {
    expect(brick.opacity).to.equal(1);
  });

  it('should have strength', () => {
    expect(brick.strength).to.equal(3);
  });

  it('should draw itself to the canvas', () => {
    assert.isFunction(brick.draw);

  });

  it('should have a function that handles collisions', () => {
    assert.isFunction(brick.handleCollision);
    brick.handleCollision();
    brick.handleCollision();
    expect(brick.strength).to.equal(1);
    expect(Math.floor(brick.opacity * 100) / 100).to.equal(.3);
  });
});
