'use strict';

const { program } = require('commander');

const ObserveError = require('../lib/internal/error');
const { startDebugger } = require('../lib/internal/utils');

program
  .option('-p, --pid <pid>', 'pid of the process observe will attach to')
  .option('-h, --host <host>', 'hostname of the process observe will attach to')
  .option('-P, --port <port>', 'port of process observe will attach to')
  .option('-f, --file <file>', 'output file, if not provided will output to stdout');

function getHostPortFromArgs({ pid, host, port }) {
  if (!pid && !host && !port) {
    throw new ObserveError('expect pid or hostname + port');
  }

  if (pid) {
    startDebugger(pid);
  }

  return { host: host || 'localhost', port: port || 9229 };
}

async function runCommand(run, program) {
  try {
    const args = program.parse(process.argv)

    const { host, port } = getHostPortFromArgs(args);

    await run(host, port, process.stdout, args);
  } catch (e) {
    if (e._liberror) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    process.exit(1);
  }
}

module.exports = { program, runCommand };
