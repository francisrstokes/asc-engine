const EventProvider = require('./EventProvider');

class Scene extends EventProvider {
  constructor() {
    super();

    this.bindEvents = true;
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  load(game) {
    this.trigger('load', game);
  }
  unload(game) {
    this.trigger('unload', game);
  }
  update(game) {
    this.trigger('update', game);
  }
  draw(game) {
    this.trigger('draw', game);
  }
}

module.exports = Scene;