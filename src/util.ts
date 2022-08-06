import { Vector } from "./Vector";

export const posToGridIndex = ([x, y]: Vector, gw: number) => {
  return x + gw * y;
};

export const posFromGridIndex = (i: number, gw: number): Vector => [(i % gw)|0, (i / gw)|0];

export const pick = <O, K extends keyof O>(props: K[], obj: O): Pick<O, K> => {
  const out: any = {};
  for (const p of props) {
    out[p] = obj[p];
  }
  return out;
};
