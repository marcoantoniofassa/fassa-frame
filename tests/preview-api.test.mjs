import test from 'node:test';
import assert from 'node:assert/strict';

test('saving renews the token once after a server restart', async t => {
  const api = await import('../skills/editonny/engine/preview/api.mjs');
  api.updateSession({ token: 'old', watcher: { alive: false } });
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    requests.push([url, options]);
    if (url === '/api/state') return Response.json({ token: 'new', watcher: { alive: true } });
    return options.headers['X-Preview-Token'] === 'old'
      ? Response.json({ ok: false }, { status: 403 })
      : Response.json({ ok: true, saved: { marks: [] } });
  });
  assert.deepEqual(await api.postJson('/api/marks', { phase: 'cut', marks: [] }), { ok: true, saved: { marks: [] } });
  assert.deepEqual(requests.map(([url]) => url), ['/api/marks', '/api/state', '/api/marks']);
  assert.equal(requests[0][1].body, requests[2][1].body);
  assert.deepEqual(api.getSession(), { token: 'new', agentListening: true });
});

test('second 403 stops retrying and network failures report an error', async t => {
  const api = await import('../skills/editonny/engine/preview/api.mjs');
  api.updateSession({ token: 'old' });
  let posts = 0;
  t.mock.method(globalThis, 'fetch', async url => {
    if (url === '/api/state') return Response.json({ token: 'new' });
    posts++;
    return Response.json({ ok: false }, { status: 403 });
  });
  await assert.rejects(api.postJson('/api/marks', {}), /403/);
  assert.equal(posts, 2);
  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('offline'); });
  await assert.rejects(api.postJson('/api/marks', {}), /Preview disconnected/);
});
