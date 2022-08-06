import { Scene } from "./Scene";

export class SceneManager<G> {
  game: G;
  scenes: Record<string, Scene<G>> = {};
  active: Scene<G> | null = null;

  constructor(game: G) {
    this.game = game;
  }

  add(scene: Scene<G>, id: string) {
    this.scenes[id] = scene;
  }

  get(id: string) {
    return this.scenes[id]
      ? this.scenes[id]
      : null;
  }

  setScene(id: string) {
    if (!(id in this.scenes)) {
      throw new Error(`No scene with id ${id}`);
    }

    if (this.active) {
      this.active.unload(this.game);
    }

    this.active = this.scenes[id];
    this.active.load(this.game);
  }
}
