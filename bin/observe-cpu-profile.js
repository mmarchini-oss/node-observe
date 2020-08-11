'use strict';

const { run } = require('../lib/commands/cpu-profile');
const { program, runCommand } = require('./common');

program
  .option('-d, --duration <duration>', 'how long the profiler should run (in seconds)', parseInt)
  .option('-s, --sampling-interval <interval>', 'sampling rate (in microseconds)', parseInt)

runCommand(run, program);
