class SceneManager {
  constructor(game) {
    this.game = game;
    this.scenes = {};
    this.active = null;
  }

  add(scene, id) {
    this.scenes[id] = scene;
  }

  setScene(id) {
    if (!(id in this.scenes)) {
      throw new Error(`No scene with id ${id}`);
    }

    if (this.active) {
      this.active.unload(this.game);
    }

    this.active = this.scenes[id];
    this.active.load(this.game);
  }
}

module.exports = SceneManager;