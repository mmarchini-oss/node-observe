'use strict'

const test = require('tape');

const { run } = require('../lib/commands/heap-snapshot');
const { startFixtureProcess, runCommandWithClient } = require('./common');

test('take heap snapshot', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const stream = await runCommandWithClient(run, port);
    t.notEqual(stream.data.length, 0);
    const { snapshot, nodes, edges, strings } = JSON.parse(stream.data);
    t.notEqual(snapshot, undefined);
    t.notEqual(nodes, undefined);
    t.notEqual(edges, undefined);
    t.notEqual(strings, undefined);
    f.send('exit');
    t.end();
  });
});
