const zPositions = {
  BG: 0,
  MG: 1,
  FG: 2,
};

const properties = {
  SOLID: 0
};

class Tile {
  constructor(char, color, zPos = zPositions.BG) {
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

module.exports = {
  Tile,
  ...zPositions,
  ...properties
};
