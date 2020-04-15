'use strict';

const { run } = require('../lib/commands/heap-snapshot');
const { program, runCommand } = require('./common');

runCommand(run, program);
