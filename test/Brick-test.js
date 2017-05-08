import { expect } from 'chai';
import Brick from '../lib/Brick.js';

describe ('Brick Test', () => {
  const brick = new Brick();

  it('should be an instance of Brick', () => {
    expect(brick).to.be.an.instanceof(Brick);
  });

  it('should have an x and a y position', () => {
    expect(brick.x);
  })

});
