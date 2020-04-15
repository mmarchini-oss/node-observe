#!/usr/bin/env node
'use strict'

const { program } = require('commander');

program
  .command('heap-profile', 'Take heap profile')
  .command('heap-snapshot', 'Take heap snapshot');

program.parse(process.argv);
