class Input {
  constructor() {
    this.keyStates = {};
    const keydownHandler = e => {
      if (this.keyStates[e.key] && !this.keyStates[e.key].lock) {
        if (!this.keyStates[e.key]) {
          this.keyStates[e.key] = {
            state: true,
            downThisFrame: true,
            upThisFrame: false,
            lock: true
          };
          return;
        }
        this.keyStates[e.key].lock = true;
        this.keyStates[e.key].state = true;
        this.keyStates[e.key].downThisFrame = true;
      }
    };

    const keyupHandler = e => {
      this.keyStates[e.key].lock = false;
      this.keyStates[e.key].state = false;
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
    return this.keyIsDown(key) && this.keyStates[key].downThisFrame;
  }

  keyReleased(key) {
    return !this.keyIsDown(key) && this.keyStates[key].upThisFrame;
  }

  update() {
    Object.values(this.keyStates).forEach(ks => {
      ks.downThisFrame = false;
      ks.upThisFrame = false;
    });
  }
}

module.exports = Input;