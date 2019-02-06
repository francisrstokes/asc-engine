const LAYERS = Object.freeze({
  HUD: 0,
  BG : 1,
  MG : 2,
  FG : 3
});

const LIFECYCLE = Object.freeze({
  BEFORE_UPDATE: '@@FRAME_BEFORE_UPDATE',
  BEFORE_DRAW: '@@FRAME_BEFORE_DRAW',
  BEFORE_COMMIT: '@@FRAME_BEFORE_RENDER_COMMIT',
  FRAME_COMPLETE: '@@FRAME_COMPLETE'
});

module.exports = Object.freeze({
  LAYERS,
  LIFECYCLE
});
