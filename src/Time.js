const FRAME_TIME = 16.666667;

class Time {
  constructor() {
    this.tracks = {};
    this.trackKeys = [];
  }

  update() {
    const now = Date.now();
    this.trackKeys.forEach(k => {
      this.tracks[k].deltaTime += now - this.tracks[k].lastTime;
      this.tracks[k].lastTime = Date.now();
    });
  }

  computeKeys() {
    this.trackKeys = Object.keys(this.tracks);
  }

  updateFrames(name, frames) {
    this.tracks[name].wait = frames * FRAME_TIME;
  }

  track(name, frames) {
    this.tracks[name] = {
      deltaTime: 0,
      lastTime: Date.now(),
      wait: frames * FRAME_TIME
    };
    this.computeKeys();
  }

  untrack(name) {
    delete this.tracks[name];
    this.computeKeys();
  }

  ifReady(name, fn) {
    if (this.tracks[name].deltaTime >= this.tracks[name].wait) {
      this.tracks[name].deltaTime = 0;
      fn();
    }
  }
}

module.exports = Time;