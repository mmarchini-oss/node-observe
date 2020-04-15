'use strict';

const { run } = require('../lib/commands/heap-snapshot');
const { program, validate= require('./common');

const args = program.parse(process.argv);
const { pid, file } = args;

if (!pid) {
  program.outputHelp();
  console.error("");
  console.error("-p is required");
  process.exit(1);
}

process.kill(pid);
run('localhost', 9229, process.stdout);
