#!/usr/bin/env node
'use strict'

const { program } = require('commander');

program
  .command('heap-profile', 'Take heap profile')
  .command('heap-snapshot', 'Take heap snapshot')
  .command('cpu-profile', 'Take CPU profile');

program.parse(process.argv);
