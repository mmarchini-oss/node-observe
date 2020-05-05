'use strict';

const { run } = require('../lib/commands/cpu-profile');
const { program, runCommand } = require('./common');

program
  .option('-d, --duration <duration>', 'how long the profiler should run', parseInt)

runCommand(run, program);
