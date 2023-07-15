'use strict'

const test = require('tape');

const Client = require('../lib/internal/inspector-client');
const { startFixtureProcess } = require('./common');

test('attach to existing process', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const client = new Client('127.0.0.1', port);
    try {
      await client.connect();
      await client.disconnect();
      t.end();
    } catch (e) {
      t.fail(e.toString())
    }
  });
});

test('send message', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const client = new Client('127.0.0.1', port);
    try {
      await client.connect();
      t.deepEqual(await client.post('Profiler.enable'), {});
      t.deepEqual(await client.post('Profiler.disable', {}), {});
      await client.disconnect();
      t.end();
    } catch (e) {
      t.fail(e.toString())
    }
  });
});

test('receive message', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const client = new Client('127.0.0.1', port);
    try {
      await client.connect();
      await client.post('Debugger.enable', {});
      client.on('Debugger.paused', async ({ reason }) => {
        t.equal(reason, 'other');
        t.deepEqual(await client.post('Debugger.resume', {}), {});
      });
      client.on('Debugger.resumed', async () => {
        await client.disconnect();
        t.end();
      });
      t.deepEqual(await client.post('Debugger.pause', {}), {});
    } catch (e) {
      t.fail(e.toString())
    }
  });
});
