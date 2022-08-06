const FRAME_TIME = 16.666667;

export type TimeState = {
  deltaTime: number,
  lastTime: number,
  wait: number
}

export type Thunk = () => void;

export class Time {
  tracks: Record<string, TimeState> = {};
  trackKeys: Array<string> = [];

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

  updateFrames(name: string, frames: number) {
    this.tracks[name].wait = frames * FRAME_TIME;
  }

  track(name: string, frames: number) {
    this.tracks[name] = {
      deltaTime: 0,
      lastTime: Date.now(),
      wait: frames * FRAME_TIME
    };
    this.computeKeys();
  }

  untrack(name: string) {
    delete this.tracks[name];
    this.computeKeys();
  }

  ifReady(name: string, fn: Thunk) {
    if (this.tracks[name].deltaTime >= this.tracks[name].wait) {
      this.tracks[name].deltaTime = 0;
      fn();
    }
  }
}
