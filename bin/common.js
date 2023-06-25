'use strict';

const { createWriteStream } = require('fs');

const { program } = require('commander');

const ObserveError = require('../lib/internal/error');
const Client = require('../lib/internal/inspector-client');
const { startDebugger } = require('../lib/internal/utils');

program
  .option('-p, --pid <pid>', 'pid of the process observe will attach to')
  .option('-h, --host <host>', 'hostname of the process observe will attach to')
  .option('-P, --port <port>', 'port of process observe will attach to')
  .option('-f, --file <file>', 'output file, if not provided will output to stdout')
  .option('-c, --close', 'close the inspector protocol connection after done. CAUTION: this will close the inspector protocol regardless if there are other tools connected to it, and it can leave the event loop blocked indefinitely if one of the connections fails to close');

function getHostPortFromArgs({ pid, host, port }) {
  if (!pid && !host && !port) {
    throw new ObserveError('expect pid or hostname + port');
  }

  if (pid) {
    startDebugger(pid);
  }

  return { host: host || '127.0.0.1', port: port || 9229 };
}

function getStreamFromArgs({ file }) {
  if (!file) return process.stdout;

  return createWriteStream(file);
}

async function runCommand(run, program) {
  try {
    const args = program.parse(process.argv)

    const { host, port } = getHostPortFromArgs(args);

    const stream = getStreamFromArgs(args);

    const client = new Client(host, port);
    await client.connect();

    await run(client, stream, args);

    if (args.close) {
      await client.post("Runtime.evaluate", { expression: 'process.mainModule.require("inspector").close();' });
    }
    client.disconnect();
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
