const {vAdd} = require('vec-la-fp');
const EventProvider = require('./EventProvider');

class Animation extends EventProvider {
  constructor(timeline, animationLength, pos, times = 1, loop = false) {
    super();

    this.timeline = timeline;
    this.active = false;
    this.pos = pos;
    this.frame = 0;
    this.animationLength = animationLength;
    this.loop = loop;
    this.times = times;
    this.freezeOnLastFrame = false;

    this.state = 0;
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  reset() {
    this.state = 0;
    this.isComplete = false;
    this.active = false;
    this.frame = 0;
  }

  draw(game, tileToScreen) {
    if (this.active) {
      this.state = Math.floor(this.frame / (this.animationLength / (this.timeline.length * this.times))) % this.timeline.length;

      const frame = this.timeline[this.state];
      frame.forEach(({tile, pos}) => {
        const screenPos = tileToScreen(vAdd(pos, this.pos));
        game.renderer.drawTile(tile, screenPos);
      });

      if (!this.isComplete) {
        if (this.frame + 1 >= this.animationLength) {
          if (this.loop) {
            this.frame = 0;
          } else {

            if (this.freezeOnLastFrame) {
              this.isComplete = true;
            } else {
              this.reset();
            }

            this.trigger('complete');
          }
        } else {
          this.frame++;
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
