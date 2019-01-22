const {vAdd} = require('vec-la-fp');

class Animation {
  constructor(timeline, animationLength, pos, times = 1, loop = false) {
    this.timeline = timeline;
    this.active = false;
    this.pos = pos;
    this.frame = 0;
    this.animationLength = animationLength;
    this.loop = loop;
    this.times = times;
    this.onComplete = null;
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  reset() {
    this.active = false;
    this.frame = 0;
  }

  draw(game, tileToScreen) {
    if (this.active) {
      const ai = Math.floor(this.frame / (this.animationLength / (this.timeline.length * this.times))) % this.timeline.length;

      const frame = this.timeline[ai];
      frame.forEach(({tile, pos}) => {
        const screenPos = tileToScreen(vAdd(pos, this.pos));
        game.renderer.drawTile(tile, screenPos);
      });

      this.frame++;
      if (this.frame >= this.animationLength) {
        if (this.loop) {
          this.frame = 0;
        } else {
          this.reset();
          if (typeof this.onComplete === 'function') {
            this.onComplete();
          }
        }
      }
    }
  }

  clone() {
    return new Animation(
      this.timeline,
      this.animationLength,
      this.pos,
      this.loop
    );
  }
}

module.exports = Animation;
