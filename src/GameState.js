class GameState {
  constructor() {
    this.state = {};
  }

  load(state) {
    this.state = state;
  }

  serialize() {
    return this.state;
  }
}

module.exports = GameState;
