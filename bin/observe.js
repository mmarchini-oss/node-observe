#!/usr/bin/env node
'use strict'

const { program } = require('commander');

program
  .command('heap-profile', 'Take heap profile', { executableFile: `${__dirname}/observe-heap-profile.js` })
  .command('heap-snapshot', 'Take heap snapshot', { executableFile: `${__dirname}/observe-heap-snapshot.js` })
  .command('cpu-profile', 'Take CPU profile', { executableFile: `${__dirname}/observe-cpu-profile.js` })
  .command('custom-script', '(experimental) Runs a custom script', { noHelp: true, executableFile: `${__dirname}/observe-custom-script.js` });

program.parse(process.argv);
