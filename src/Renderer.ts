import { Color } from "./Color";
import { Tile } from "./Tile";
import { pick } from "./util";
import { Vector } from "./Vector";

const pushProps: Array<keyof CanvasRenderingContext2D> = [
  'fillStyle',
  'strokeStyle',
  'font',
  'filter',
  'lineWidth'
];
type StyleStackProps = Pick<CanvasRenderingContext2D,
  | 'fillStyle'
  | 'strokeStyle'
  | 'font'
  | 'filter'
  | 'lineWidth'
>;

export type BufferedDrawingElement = {
  pos: Vector,
  char: string,
  color: Color,
  draw: boolean,
  size: number,
};

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private font: string;
  private styleStack: Array<StyleStackProps> = [];
  private buffers: [
    Array<BufferedDrawingElement>,
    Array<BufferedDrawingElement>,
    Array<BufferedDrawingElement>,
    Array<BufferedDrawingElement>,
  ] = [[],[],[],[]];
  private size: number = 0;

  constructor(canvas: HTMLCanvasElement, canvasWidth: number, canvasHeight: number) {
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    this.font = `'Source Code Pro', monospace`;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.textBaseline = 'top';

    this.setTileSize(20);
  }

  commit() {
    this.pushStyle();
    for (const buffer of this.buffers) {
      for (const {pos, color, char, draw, size} of buffer) {
        if (draw) {
          if (this.size !== size) {
            this.setTileSize(size);
          }
          this.ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
          this.ctx.fillText(char, pos[0], pos[1]);
        }
      }
    }
    this.popStyle();
  }

  pushStyle() {
    this.styleStack.push(pick(pushProps, this.ctx));
  }

  popStyle() {
    const popped = this.styleStack.pop();
    if (popped) {
      Object.assign(this.ctx, popped);
    } else {
      throw new RangeError(`No styles to pop in the stack`);
    }
  }

  setTileSize(size: number) {
    if (size !== this.size) {
      this.size = size;
      this.ctx.font = `${this.size}px ${this.font}`;
    }
  }

  clearBackground([r, g, b, a]: Color) {
    this.pushStyle();
    this.ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    this.ctx.beginPath()
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fill();
    this.ctx.closePath();
    this.popStyle();
  }

  drawTile({char, color, zPos}: Tile, pos: Vector) {
    this.buffers[zPos].unshift({
      pos,
      char,
      color,
      draw: true,
      size: this.size
    });
  }

  drawRect(fill: string, stroke: string, [x, y]: Vector, w: number, h: number, strokeWeight = 1) {
    this.pushStyle();
    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = strokeWeight;

    this.ctx.fillRect(x, y, w, h);
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
    this.popStyle();
  }

  drawCircle(fill: string, stroke: string, [x, y]: Vector, r: number, strokeWeight = 1) {
    this.pushStyle();
    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = strokeWeight;

    this.ctx.beginPath();
    this.ctx.ellipse(x, y, r, r, 0, 0, Math.PI*2, false);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();

    this.popStyle();
  }
}
