const {FG, MG, BG} = require('./Tile');
const {pick} = require('./util');

const FONT = `'Source Code Pro', monospace`;

class Renderer {
  constructor(canvas, canvasWidth, canvasHeight) {
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    this._styleStack = [];
    this.ctx = canvas.getContext('2d');
    this.ctx.textBaseline = 'top';

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.setTileSize(20);

    this.buffers = [ [], [], [] ];
  }

  commit() {
    for (let i = 0; i < this.buffers.length; i++) {
      while (this.buffers[i].length) this.buffers[i].pop()();
    }
  }

  pushStyle() {
    const props = ['fillStyle', 'strokeStyle', 'font', 'filter', 'lineWidth'];
    this._styleStack.push(pick(props, this.ctx));
  }

  popStyle() {
    if (this._styleStack.length > 0) {
      const entries = Object.entries(this._styleStack.pop());
      for (const [key, value] of entries) {
        this.ctx[key] = value;
      }
    } else {
      throw new RangeError(`No styles to pop in the stack`);
    }
  }

  setTileSize(size) {
    if (size !== this.size) {
      this.size = size;
      this.ctx.font = `${this.size}px ${FONT}`;
    }
  }

  clearBackground(col) {
    this.pushStyle();
    this.ctx.fillStyle = col;
    this.ctx.beginPath()
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fill();
    this.ctx.closePath();
    this.popStyle();
  }

  drawTile(t, pos) {
    this.buffers[t.zPos].unshift(() => {
      this.pushStyle();
      this.ctx.fillStyle = t.color;
      this.ctx.fillText(t.char, pos[0], pos[1]);
      this.popStyle();
    });
  }

  drawRect(fill, stroke, [x, y], w, h, strokeWeight = 1) {
    this.pushStyle();
    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = strokeWeight;

    this.ctx.fillRect(x, y, w, h);
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
    this.popStyle();
  }

  drawCircle(fill, stroke, [x, y], r, strokeWeight = 1) {
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

module.exports = Renderer;
