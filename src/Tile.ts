import {Layers} from './constants';
import {Color} from './Color'

export class Tile {
  char: string;
  color: Color;
  zPos: Layers;
  properties: Array<string> = [];

  constructor(char: string, color: Color, zPos = Layers.BG) {
    this.char = char;
    this.color = color;
    this.zPos = zPos;
    this.properties = [];
  }

  hasProperty(prop: string) {
    return this.properties.includes(prop);
  }

  addProperty(prop: string) {
    this.properties.push(prop);
    return this;
  }

  static from(char: string, color: Color, zPos = Layers.BG) {
    return new Tile(char, color, zPos);
  }
}
