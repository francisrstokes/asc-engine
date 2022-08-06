import { Tile } from "./Tile";

export class AnimatedTile extends Tile {
  timeline: Tile[];
  animationLength: number;
  frame = 0;

  constructor(timeline: Tile[], animationLength: number) {
    super(timeline[0].char, timeline[0].color, timeline[0].zPos);
    this.timeline = timeline;
    this.animationLength = animationLength;
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

  from(timeline: Tile[], animationLength: number) {
    return new AnimatedTile(timeline, animationLength);
  }
}
