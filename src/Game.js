const {vAdd, vScale} = require('vec-la-fp');

const GameState = require('./GameState');
const Input = require('./Input');
const PubSub = require('./PubSub');
const Renderer = require('./Renderer');
const Time = require('./Time');
const {posToGridIndex} = require('./util');

class Game {
  constructor(canvasId, canvasWidth, canvasHeight) {
    const events = new PubSub();
    this.subscribe = events.subscribe.bind(events);
    this.publish = events.publish.bind(events);

    const canvas = document.getElementById(canvasId);
    this.renderer = new Renderer(canvas, canvasWidth, canvasHeight);

    this.area = null;
    this.time = new Time();
    this.time.track('@@FRAMES', 1);

    this.input = new Input();
    this.state = new GameState();

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
    this.time.update();
    this.time.ifReady('@@FRAMES', () => {
      this.frames++;

      this.publish('@@FRAME_BEFORE_UPDATE');
      this.onUpdate();

      this.publish('@@FRAME_BEFORE_DRAW');
      this.onDraw();

      this.publish('@@FRAME_BEFORE_RENDER_COMMIT');
      this.renderer.commit();

      this.input.update();
      this.publish('@@FRAME_COMPLETE');
    });

    requestAnimationFrame(this.boundDraw);
  }
}

module.exports = Game;
