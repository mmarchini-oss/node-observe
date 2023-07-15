'use strict'

const test = require('tape');

const { run } = require('../lib/commands/heap-profile');
const { startFixtureProcess, runCommandWithClient } = require('./common');


test('take heap profile', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    // Mock setTimeout
    const oldSetTimeout = setTimeout;
    // eslint-disable-next-line no-global-assign
    setTimeout = (fn) => oldSetTimeout(fn, 1 * 1000);
    const stream = await runCommandWithClient(run, port);
    // eslint-disable-next-line no-global-assign
    setTimeout = oldSetTimeout;
    t.notEqual(stream.data.length, 0);
    const { head } = JSON.parse(stream.data);
    t.notEqual(head, undefined);
    const { callFrame } = head;
    t.notEqual(callFrame, undefined);
    t.end();
  });
});

test('take heap profile with duration', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const stream = await runCommandWithClient(run, port, { duration: 1 });

    t.notEqual(stream.data.length, 0);
    const { head } = JSON.parse(stream.data);
    t.notEqual(head, undefined);
    const { callFrame } = head;
    t.notEqual(callFrame, undefined);

    t.end();
  });
});

test('take heap profile with samplingInterval', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const stream1 = await runCommandWithClient(run, port, { duration: 1, });


    const stream2 = await runCommandWithClient(run, port, { duration: 1, samplingInterval : 1024 });

    // The second run samples 500 times more, so it's reasonable to assume more
    // frames will be captured, thus the profile should be bigger, even if it
    // is a grouped profile format.
    t.ok(stream1.data.length * 3 < stream2.data.length);

    t.end();
  });
});
