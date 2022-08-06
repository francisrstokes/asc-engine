import { Tile } from "./Tile";
import { posFromGridIndex, posToGridIndex } from "./util";
import { vAdd, Vector, vScale } from "./Vector";

type IterateGridFn = (t: Tile, pos: Vector) => void;

export class Area {
  width: number;
  height: number;
  offset: Vector;
  size: number;

  transform = (pos: Vector) => vAdd(vScale(this.size, pos), this.offset);

  grid: Tile[] = [];

  constructor(width: number, height: number, offset: Vector, size: number) {
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.size = size;
  }

  setGrid(grid: Tile[]) {
    this.grid = grid;
  }

  setGridAtPos(tile: Tile, pos: Vector) {
    const i = posToGridIndex(pos, this.width);
    if (i >= this.grid.length) {
      throw new RangeError(`Can't set out of range index ${i} (${pos[0]}, ${[pos[1]]}) on grid with only ${this.grid.length} tiles`);
    }
    this.grid[i] = tile;
  }

  iterateGridIn2d(fn: IterateGridFn) {
    this.grid.forEach((t, i) => {
      const pos = posFromGridIndex(i, this.width);
      fn(t, pos);
    });
  }

  from(width: number, height: number, offset: Vector, size: number) {
    return new Area(width, height, offset, size);
  }
}
