'use strict'

const test = require('tape');

const {
  startFixtureProcess,
  runObserveExecutable,
  getPort,
  validateCpuProfile,
  isPortInUse
} = require('./common');

test('observe heap-profile', async (t) => {
  const port = await getPort();
  const f = startFixtureProcess(t, false, port);
  f.on('ready', async () => {
    const options = { pid: f.pid, port, options: ['-d', 1]};
    const { head } = await runObserveExecutable('heap-profile', options);
    t.notEqual(head, undefined);
    const { callFrame } = head;
    t.notEqual(callFrame, undefined);
    f.send('exit');
    t.end();
  });
});

test('observe heap-profile to file', async (t) => {
  const port = await getPort();
  const f = startFixtureProcess(t, false, port);
  f.on('ready', async () => {
    const options = { pid: f.pid, port, toFile: true, options: ['-d', 1]};
    const { head } = await runObserveExecutable('heap-profile', options);
    t.notEqual(head, undefined);
    const { callFrame } = head;
    t.notEqual(callFrame, undefined);
    f.send('exit');
    t.end();
  });
});

test('observe heap-snapshot', async (t) => {
  const port = await getPort();
  const f = startFixtureProcess(t, false, port);
  f.on('ready', async () => {
    const options = { pid: f.pid, port };
    const { snapshot, nodes, edges, strings } =
        await runObserveExecutable('heap-snapshot', options);
    t.notEqual(snapshot, undefined);
    t.notEqual(nodes, undefined);
    t.notEqual(edges, undefined);
    t.notEqual(strings, undefined);
    f.send('exit');
    t.end();
  });
});

test('observe heap-snapshot to file', async (t) => {
  const port = await getPort();
  const f = startFixtureProcess(t, false, port);
  f.on('ready', async () => {
    const options = { pid: f.pid, toFile: true, port };
    const { snapshot, nodes, edges, strings } =
        await runObserveExecutable('heap-snapshot', options);
    t.notEqual(snapshot, undefined);
    t.notEqual(nodes, undefined);
    t.notEqual(edges, undefined);
    t.notEqual(strings, undefined);
    f.send('exit');
    t.end();
  });
});

test('observe cpu-profile', async (t) => {
  const port = await getPort();
  const f = startFixtureProcess(t, false, port);
  f.on('ready', async () => {
    const options = { pid: f.pid, port, options: ['-d', 1]};
    const result = await runObserveExecutable('cpu-profile', options);
    t.ok(validateCpuProfile(result));
    f.send('exit');
    t.end();
  });
});

test('observe cpu-profile to file', async (t) => {
  const port = await getPort();
  const f = startFixtureProcess(t, false, port);
  f.on('ready', async () => {
    const options = { pid: f.pid, port, toFile: true, options: ['-d', 1]};
    const result = await runObserveExecutable('cpu-profile', options);
    t.ok(validateCpuProfile(result));
    f.send('exit');
    t.end();
  });
});

test('observe --close', async (t) => {
  const port = await getPort();
  const f = startFixtureProcess(t, false, port);
  f.on('ready', async () => {
    const options = { pid: f.pid, port, options: ['-d', 1, '--close']};
    const result = await runObserveExecutable('cpu-profile', options);
    setTimeout(async () => {
      t.notOk(await isPortInUse(port));
      t.ok(validateCpuProfile(result));
      f.send('exit');
      t.end();
    }, 500);
  });
});
