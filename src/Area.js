const {posToGridIndex} = require('./util');

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
}

module.exports = Area;
