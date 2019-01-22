const {vAdd, vScale} = require('vec-la-fp');

const GameState = require('./GameState');
const Input = require('./Input');
const PubSub = require('./PubSub');
const Renderer = require('./Renderer');
const {posToGridIndex} = require('./util');

class Game {
  constructor(canvasId, canvasWidth, canvasHeight) {
    const events = new PubSub();
    this.subscribe = events.subscribe.bind(events);
    this.publish = events.publish.bind(events);

    const canvas = document.getElementById(canvasId);
    this.renderer = new Renderer(canvas, canvasWidth, canvasHeight);

    this.area = null;

    this.input = new Input();
    this.state = new GameState();

    this.deltaTime = 0;
    this.lastTime = Date.now();
    this.frames = 0;
    this.boundDraw = this.draw.bind(this);

    this.onUpdate = () => {};
    this.onDraw = () => {};
  }

  createScreenRegion(pos, getTileSize) {
    return tileXY => vAdd(vScale(getTileSize(), tileXY), pos);
  }

  setCurrentArea(area) {
    this.area = area;
    this.renderer.setTileSize(area.size);
  }

  getTile(pos) {
    const [x, y] = pos;
    const {width:w, height:h} = this.area;
    if (x >= w || y >= h || x < 0 || y < 0) return null;
    const index = posToGridIndex(pos, w)
    return this.area.grid[index];
  }

  start() {
    requestAnimationFrame(this.boundDraw);
  }

  draw() {
    this.deltaTime += Date.now() - this.lastTime;
    if (this.deltaTime >= 16) {
      this.deltaTime = 0;
      this.frames++;

      this.onUpdate();
      this.onDraw();

      this.renderer.commit();

      // Reset the frame values for input
      this.input.update();
    }

    requestAnimationFrame(this.boundDraw);
  }
}

module.exports = Game;
