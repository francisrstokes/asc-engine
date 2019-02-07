class Scene {
  constructor() {
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.onLoad = function () {};
    this.onUnload = function () {};
    this.onUpdate = function () {};
    this.onDraw = function () {};
  }

  load(game) {
    this.onLoad.call(this, game);
  }
  unload(game) {
    this.onUnload.call(this, game);
  }
  update(game) {
    this.onUpdate.call(this, game);
  }
  draw(game) {
    this.onDraw.call(this, game);
  }
}

module.exports = Scene;