const {pick} = require('./util');

class Renderer {
  constructor(canvas, canvasWidth, canvasHeight) {
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    this.font = `'Source Code Pro', monospace`;

    this._styleStack = [];
    this.ctx = canvas.getContext('2d');
    this.ctx.textBaseline = 'top';

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.setTileSize(20);

    this.buffers = [ [], [], [], [] ];
  }

  commit() {
    this.pushStyle();
    for (let i = 0; i < this.buffers.length; i++) {
      while (this.buffers[i].length) {
        const {pos, color, char, draw, size} = this.buffers[i].pop();
        if (draw) {
          if (this.size !== size) {
            this.setTileSize(size);
          }
          this.ctx.fillStyle = color;
          this.ctx.fillText(char, pos[0], pos[1]);
        }
      }
    }
    this.popStyle();
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
      this.ctx.font = `${this.size}px ${this.font}`;
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

  drawTile({char, color, zPos}, pos) {
    this.buffers[zPos].unshift({
      pos,
      char,
      color,
      draw: true,
      size: this.size
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
