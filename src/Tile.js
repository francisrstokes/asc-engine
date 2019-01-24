const {fromify} = require('./util');
const {LAYERS} = require('./constants');

class Tile {
  constructor(char, color, zPos = LAYERS.BG) {
    this.char = char;
    this.color = color;
    this.zPos = zPos;
    this.properties = [];
  }

  hasProperty(prop) {
    return this.properties.includes(prop);
  }

  addProperty(prop) {
    this.properties.push(prop);
    return this;
  }
}

Tile.from = fromify(Tile);

module.exports = Tile;
