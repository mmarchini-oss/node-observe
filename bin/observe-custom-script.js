'use strict';

const { run } = require('../lib/commands/custom-script');
const { program, runCommand } = require('./common');

program
  .option('-s, --script <script>', 'file where script lives');

runCommand(run, program);
