const {posToGridIndex, posFromGridIndex, fromify} = require('./util');

class Area {
  constructor(width, height, offset, size) {
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.size = size;

    this.grid = [];

    this.actors = [];

    this.items = [];

    this.handlers = {};
  }

  setGrid(grid) {
    this.grid = grid;
  }

  setGridAtPos(tile, pos) {
    const i = posToGridIndex(pos, this.width);
    if (i >= this.grid.length) {
      throw new RangeError(`Can't set out of range index ${i} (${x}, ${y}) on grid with only ${this.grid.length} tiles`);
    }
    this.grid[i] = tile;
  }

  iterateGridIn2d(fn) {
    this.grid.forEach((t, i) => {
      const pos = posFromGridIndex(i, this.width, this.height);
      fn(t, pos);
    });
  }
}

Area.from = fromify(Area);

module.exports = Area;
