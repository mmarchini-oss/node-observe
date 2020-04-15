'use strict';

const { run } = require('../lib/commands/heap-profile');
const { program, getHostPortFromArgs } = require('./common');

program
  .option('-r, --sampling-rate <rate>', 'sampling rate (in bytes)')
  .option('-d, --duration <duration>', 'how long the profiler should run')

const args = program.parse(process.argv);
const { pid, file, samplingRate, duration } = args;

async function main() {
  try {
    const { host, port } = getHostPortFromArgs(args);
    const options = {};
    if (samplingRate !== undefined) {
      options['samplingInterval'] = parseInt(samplingRate);
    }
    if (duration !== undefined) {
      options['duration'] = parseInt(duration);
    }

    await run('localhost', 9229, process.stdout, options);
  } catch (e) {
    if (e._liberror) {
      console.error(e.message);
      process.exit(1);
    } else {
      console.error(e);
    }
  }
}

main();
