'use strict'

const test = require('tape');

const { run } = require('../lib/commands/cpu-profile');
const { startFixtureProcess, validateCpuProfile, runCommandWithClient } = require('./common');


test('take cpu profile', (t) => {
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
    const result = JSON.parse(stream.data);
    t.ok(validateCpuProfile(result));
    f.send('exit');
    t.end();
  });
});

test('take cpu profile with duration', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const stream = await runCommandWithClient(run, port, { duration: 1 });

    t.notEqual(stream.data.length, 0);
    const result = JSON.parse(stream.data);
    t.ok(validateCpuProfile(result));

    f.send('exit');
    t.end();
  });
});

test('take cpu profile with samplingInterval', (t) => {
  const f = startFixtureProcess(t, true);
  f.on('inspectorReady', async ({ port }) => {
    t.ok(port > 0);

    const stream1 = await runCommandWithClient(run, port, { duration: 1, samplingInterval : 1000 });

    const stream2 = await runCommandWithClient(run, port, { duration: 1, samplingInterval : 100 });

    const { samples: samples1 } = JSON.parse(stream1.data);
    const { samples: samples2 } = JSON.parse(stream2.data);

    // The second run samples 10 times more, so it's reasonable to assume more
    // samples will be captured.
    t.ok(samples1.length * 3 < samples2.length);

    f.send('exit');
    t.end();
  });
});
