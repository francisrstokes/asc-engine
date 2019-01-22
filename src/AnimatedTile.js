const {Tile, BG} = require('./Tile');

class AnimatedTile extends Tile {
  constructor(timeline, animationLength) {
    super(timeline[0].char, timeline[0].color, timeline[0].zPos);
    this.timeline = timeline;
    this.animationLength = animationLength;
    this.frame = 0;
  }

  update() {
    const i = Math.floor(this.frame / (this.animationLength / (this.timeline.length)));
    this.char = this.timeline[i].char;
    this.color = this.timeline[i].color;
    this.zPos = this.timeline[i].zPos;
    this.frame++;
    if (this.frame >= this.animationLength) {
      this.frame = 0;
    }
  }
}

module.exports = AnimatedTile;
