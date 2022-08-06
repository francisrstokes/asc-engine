export type Vector = [number, number];

export const vAdd = (v1: Vector, v2: Vector): Vector => [v1[0] + v2[0], v1[1] + v2[1]];
export const vScale = (s: number, v: Vector): Vector => [v[0] * s, v[1] * s];
