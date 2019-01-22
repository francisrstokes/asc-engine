class Input {
  constructor() {
    this.keyStates = {};
    const keydownHandler = e => {
      if (!this.keyStates[e.key]) {
        this.keyStates[e.key] = {
          state: true,
          downThisFrame: true,
          upThisFrame: false
        };
        return;
      }

      this.keyStates[e.key].state = true;
      this.keyStates[e.key].downThisFrame = true;
      this.keyStates[e.key].upThisFrame = false;
    };

    const keyupHandler = e => {
      if (!this.keyStates[e.key]) {
        this.keyStates[e.key] = {
          state: false,
          downThisFrame: false,
          upThisFrame: true
        };
        return;
      }

      this.keyStates[e.key].state = false;
      this.keyStates[e.key].downThisFrame = false;
      this.keyStates[e.key].upThisFrame = true;
    };

    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);

    this.cleanup = () => {
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('keyup', keyupHandler);
    };
  }

  keyIsDown(key) {
    if (!(key in this.keyStates)) {
      this.keyStates[key] = {
        state: false,
        downThisFrame: false,
        upThisFrame: false
      };
      return false;
    }
    return this.keyStates[key].state;
  }

  keyPressed(key) {
    return this.keyIsDown(key) && this.keyStates.downThisFrame;
  }

  keyReleased(key) {
    return !this.keyIsDown(key) && this.keyStates.upThisFrame;
  }

  update() {
    Object.values(this.keyStates).forEach(ks => {
      ks.downThisFrame = false;
      ks.upThisFrame = false;
    });
  }
}

module.exports = Input;