import { Area } from "./Area";
import { EventProvider } from "./EventProvider";
import { Input } from "./Input";
import { Renderer } from "./Renderer";
import { Scene, SceneEvents } from "./Scene";
import { SceneManager } from "./SceneManager";
import { Tile } from "./Tile";
import { Time } from "./Time";
import { posToGridIndex } from "./util";
import { vAdd, Vector, vScale } from "./Vector";

export type GameEvents = {
  beforeUpdate: number,
  update: number,
  beforeDraw: number,
  draw: number,
  beforeCommit: number,
  frameComplete: number,
}

export class Game extends EventProvider<GameEvents> {
  renderer: Renderer;
  frames = 0;
  area: Area | null = null
  time = new Time();
  scenes = new SceneManager(this);
  input = new Input();
  boundDraw: () => void;

  constructor(canvasId: string, canvasWidth: number, canvasHeight: number) {
    super();

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.renderer = new Renderer(canvas, canvasWidth, canvasHeight);

    this.time.track('@@FRAMES', 1);

    this.boundDraw = this.draw.bind(this);
  }

  createScreenRegion(pos: Vector, getTileSize: () => number) {
    return (tileXY: Vector) => vAdd(vScale(getTileSize(), tileXY), pos);
  }

  setCurrentArea(area: Area) {
    this.area = area;
    this.renderer.setTileSize(area.size);
  }

  getTile(pos: Vector) {
    if (!this.area) return null;

    const [x, y] = pos;
    const {width:w, height:h} = this.area;
    if (x >= w || y >= h || x < 0 || y < 0) return null;
    const index = posToGridIndex(pos, w)
    return this.area.grid[index];
  }

  start() {
    requestAnimationFrame(this.boundDraw);
  }

  draw() {
    this.time.update();
    this.time.ifReady('@@FRAMES', () => {
      this.frames++;
      this.trigger('beforeUpdate', this.frames);
      this.trigger('update', this.frames);
      this.trigger('beforeDraw', this.frames);
      this.trigger('draw', this.frames);
      this.trigger('beforeCommit', this.frames);
      this.renderer.commit();
      this.input.update();
      this.trigger('frameComplete', this.frames);
    });

    requestAnimationFrame(this.boundDraw);
  }
}
