'use strict'

const { FixtureProcess } = require('../common');
const inspector = require('inspector');

const f = new FixtureProcess(process);

async function doSomeWork(num) {
  if (num <= 1) return 1;

  setTimeout(() => Promise.all([doSomeWork(num + 1), doSomeWork(num + 2)]), 250);
}

function maybeSendInspectorReadyEvent() {
  if (inspector.url()) {
    const port = (new URL(inspector.url())).port
    f.send('inspectorReady', { port });
  }
}

function openInspector() {
  console.log('opening inspector');
  inspector.open();
  console.log('inspector opened');
  maybeSendInspectorReadyEvent();
}

// Tests are responsible to finish the
setTimeout(() => { f.send('timeout'); process.exit(1) }, 10000);

process.on('SIGUSR1', openInspector);

f.on('exit', ({ code }) => process.exit(code || 0));
f.send('ready');
maybeSendInspectorReadyEvent();
doSomeWork();
