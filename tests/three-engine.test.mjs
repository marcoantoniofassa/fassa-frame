import test from 'node:test';
import assert from 'node:assert/strict';
import * as engine from '../skills/editonny/engine/project-template/compositions/scenes/3d/three-scene.js';

test('facade exposes the complete scene API', () => {
  assert.deepEqual(Object.keys(engine).sort(), [
    'THREE', 'REVISION', 'clamp', 'mix', 'smooth', 'easeOut', 'interval', 'word',
    'moment', 'orbit', 'mixPose', 'frameCamera', 'sphereDistance',
    'boxDistance', 'fittingDistance', 'material', 'plate', 'box',
    'cylinder', 'volumeText', 'mediaTexture', 'loadModel', 'initialize',
  ].sort());
});

test('animation handles bounds, zero duration, accents, and missing-word fallback', () => {
  assert.equal(engine.clamp(2), 1);
  assert.equal(engine.clamp(-2), 0);
  assert.equal(engine.interval(0, 1, 2), 0);
  assert.equal(engine.interval(3, 1, 2), 1);
  assert.equal(engine.interval(1, 1, 0), 1);
  assert.equal(engine.interval(0, 1, 0), 0);
  const scene = { words: [{ text: 'café', t: 1 }, { text: 'cacao', t: 3 }] };
  assert.equal(engine.word(scene, 'ca', 2), 3);
  assert.equal(engine.moment(scene, { word: 'café', after: 2, standard: 4 }), 4);
  assert.equal(engine.moment(scene, 'café'), 1);
});

test('partial poses preserve omitted fields and orbit faces its target', () => {
  const pose = engine.mixPose({ target: [0, 0, 0], dist: 10, azim: 0, elev: 0 },
    { target: [2, 4, 6], dist: 20 }, 0.5);
  assert.deepEqual(pose, { target: [1, 2, 3], dist: 15, azim: 0, elev: 0 });
  const camera = new engine.THREE.PerspectiveCamera();
  engine.orbit(camera, pose);
  assert.deepEqual(camera.position.toArray(), [1, 2, 18]);
  assert.ok(camera.getWorldDirection(new engine.THREE.Vector3()).distanceTo(new engine.THREE.Vector3(0, 0, -1)) < 1e-10);
});

test('time and camera modules share their facade functions', async () => {
  const time = await import('../skills/editonny/engine/project-template/compositions/scenes/3d/engine/time.mjs');
  const camera = await import('../skills/editonny/engine/project-template/compositions/scenes/3d/engine/camera.mjs');
  assert.equal(time.interval, engine.interval);
  assert.equal(camera.mixPose, engine.mixPose);
});
