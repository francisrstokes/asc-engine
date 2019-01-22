const posToGridIndex = ([x, y], gw) => {
  return x + gw * y;
}
const posFromGridIndex = (i, gw) => [(i % gw)|0, (i / gw)|0];

const pick = (props, obj) => {
  const out = {};
  for (const p of props) {
    out[p] = obj[p];
  }
  return out;
}

module.exports = {
  posToGridIndex,
  posFromGridIndex,
  pick
};
