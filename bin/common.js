'use strict';

const { program } = require('commander');

const ObserveError = require('../lib/error');
const { startDebugger } = require('../lib/utils');

program
  .option('-p, --pid <pid>', 'pid of the process observe will attach to')
  .option('-f, --file <file>', 'output file, if not provided will output to stdout');

function getHostPortFromArgs({ pid }) {
  if (!pid) {
    throw new ObserveError('-p is required');
  }

  startDebugger(pid);

  return { host: 'localhost', port: 9229 };
}

module.exports = { program, getHostPortFromArgs };
