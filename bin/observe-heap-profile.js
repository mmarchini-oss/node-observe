'use strict';

const { run } = require('../lib/commands/heap-profile');
const { program, runCommand } = require('./common');

program
  .option('-s, --sampling-interval <interval>', 'sampling rate (in bytes)', parseInt)
  .option('-d, --duration <duration>', 'how long the profiler should run (in seconds)', parseInt)

runCommand(run, program);
