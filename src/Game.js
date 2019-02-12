const {vAdd, vScale} = require('vec-la-fp');

const Input = require('./Input');
const Renderer = require('./Renderer');
const SceneManager = require('./SceneManager');
const Time = require('./Time');
const {posToGridIndex} = require('./util');
const EventProvider = require('./EventProvider');

class Game extends EventProvider {
  constructor(canvasId, canvasWidth, canvasHeight) {
    super();

    const canvas = document.getElementById(canvasId);
    this.renderer = new Renderer(canvas, canvasWidth, canvasHeight);

    this.area = null;
    this.time = new Time();
    this.time.track('@@FRAMES', 1);

    this.scenes = new SceneManager(this);
    this.input = new Input();

    this.frames = 0;
    this.boundDraw = this.draw.bind(this);
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
      this.trigger('beforeUpdate');
      this.trigger('update');
      this.trigger('beforeDraw');
      this.trigger('draw');
      this.trigger('beforeCommit');
      this.renderer.commit();
      this.input.update();
      this.trigger('frameComplete');
    });

    requestAnimationFrame(this.boundDraw);
  }
}

module.exports = Game;
