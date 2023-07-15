'use strict'

const test = require('tape');

const { startDebugger } = require('../lib/internal/utils');

const { startFixtureProcess } = require('./common');

test('attach to existing process', (t) => {
  const f = startFixtureProcess(t);
  f.on('ready', () => t.doesNotThrow(() => {
    startDebugger(f.pid);
  }));

  f.on('inspectorReady', () => {
    t.end();
  });
});

test('attach to non-existing process', (t) => {
  const f = startFixtureProcess(t);
  f.on('ready', () => f.exit());

  // TODO(mmarchini): There's probably a better way to do this.
  f._p.on('close', () => {
    t.throws(() => {
      startDebugger(f.pid);
    }, /doesn't exist/);
    t.end();
  })
});
