'use strict'

const EventEmitter = require('events');
const { fork, spawn } = require('child_process');
const { tmpdir } = require('os');
const { join } = require('path');
const { readFile, unlink } = require('fs');
const { promisify } = require('util');
const path = require('path');
const net = require('net');

const Client = require('../lib/internal/inspector-client');

const { OBSERVE_EXECUTABLE, OBSERVE_ARGS } = (() => {
  if (process.env.OBSERVE_EXECUTABLE)
    return {
      OBSERVE_EXECUTABLE: process.env.OBSERVE_EXECUTABLE,
      OBSERVE_ARGS: []
    };
  else {
    return {
      OBSERVE_EXECUTABLE: process.execPath,
      OBSERVE_ARGS: [join(__dirname, '..', 'bin', 'observe.js')]
    }
  }
})()

async function isPortInUse(port) {
  let resolve, reject;
  const promise = new Promise((a, b) => { resolve = a; reject = b });

  const server = net.createServer();
  server.on('error', async function (err) {
    if (err.code === 'EADDRINUSE') {
      return resolve(true)
    }
    return reject(err);
  });
  server.listen(port, '127.0.0.1', function (err) {
    if (err) {
      return reject(err);
    }
    server.once('close', function () {
      resolve(false)
    })
    server.close()
  });

  return promise;
}


async function getPort(nextPort = 45032) {
  if (await isPortInUse(nextPort)) {
    return getPort(nextPort++);
  } else {
    return nextPort;
  }
}

function startFixtureProcess(t, withInspector = false, port = '0') {
  const execArgv = [ '--inspect-port', port ];
  if (withInspector) {
    execArgv.push('--inspect');
  }
  const child = fork('./test/fixtures/default-program.js', { execArgv, silent: true});
  let output = '';
  child.stdout.setEncoding('utf-8');
  child.stdout.on('data', (data) => output += `[${ child.pid }][stdout] ${ data }`);
  child.stderr.setEncoding('utf-8');
  child.stderr.on('data', (data) => output += `[${ child.pid }][stderr] ${ data }`);
  const fixture = new FixtureProcess(child);
  fixture.on('timeout', t.fail);
  t.once('result', ({ ok }) => { if (!ok) { console.log(output) } });
  t.teardown(() => { fixture.exit(); });
  return fixture;
}

let temporaryFileCounter = 0;

function getTemporaryFile() {
  const hrtime = process.hrtime().join('');
  const random = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER / 2));
  return path.join(tmpdir(), `${hrtime}-${temporaryFileCounter++}-${random}`);
}

function cleanupTemporaryFile(file) {
  unlink(file, (err) => {
    if (err) {
      console.error("Error while cleaning up temporary file:");
      console.error(err);
      return;
    }
  });
}

async function runObserveExecutable(command, t, { port, pid, toFile, options }) {
  let args = [...OBSERVE_ARGS, command]
  if (pid)
    args = args.concat(['-p', pid]);
  if (port)
    args = args.concat(['-P', port]);
  if (options)
    args = args.concat(options);
  let file;
  if (toFile) {
    file = getTemporaryFile();
    args = args.concat(['-f', file]);
  }
  const child = spawn(OBSERVE_EXECUTABLE, args, { encoding: 'utf8', stdio: 'pipe' });
  let stdout = ""
  let stderr = "";
  child.stdout.on('data', (chunk) => stdout = stdout + chunk);
  child.stderr.on('data', (chunk) => stderr = stderr + chunk);
  return new Promise((resolve, reject) => {
    child.on('exit', async (code, signal) => {
      if (code !== 0 || signal) {
        console.error({ stdout, stderr });
        return reject(new Error(`Process exited with code ${code || signal}`));
      }
      if (toFile) {
        stdout = await promisify(readFile)(file);
        cleanupTemporaryFile(file);
      }
      if (!stdout) {
        return reject(new Error(`Empty stdout`));
      }
      return resolve(JSON.parse(stdout));
    });
  }).catch(t.fail);
}

class FixtureProcess extends EventEmitter {
  constructor(p) {
    super();
    this._p = p;
    this.pid = p.pid;
    this.exited = false;
    this._backlog = {};
    p.on('message', ({ event, payload }) => {
      payload = payload || {};
      if (this.listenerCount(event)) {
        this.emit(event, payload);
      } else {
        const events = this._backlog[event] || [];
        events.push(payload);
        this._backlog[event] = events;
      }
    });
    this.on('newListener', (event) => {
      if (this._backlog[event]) {
        for (const payload of this._backlog[event]) {
          this.emit(event, payload);
        }
        delete this._backlog[event];
      }
    });
  }

  send(event, payload = {}) {
    this._p.send({ event, payload });
  }

  exit() {
    // I'm not sure this is the best way to handle this, but there is one test
    // that needs to call exit(), but we want to have teardown() run it for
    // every other test
    if (!this.exited) {
      this.exited = true;
      this.send('exit');
    }
  }
}

function validateCpuProfile({ nodes, startTime, endTime, samples, timeDeltas }) {
    return Array.isArray(nodes) && Number.isInteger(startTime) &&
           Number.isInteger(endTime) && Array.isArray(samples) &&
           Array.isArray(timeDeltas);
}

class FakeStream {
  constructor() {
    this.data = '';
  }

  write(chunk) {
    this.data += chunk;
  }
}

async function runCommandWithClient(run, port, ...args) {
  const stream = new FakeStream();

  const client = new Client('127.0.0.1', port);
  await client.connect();

  await run(client, stream, ...args);

  client.disconnect();

  return stream;
}

module.exports = {
  startFixtureProcess,
  FixtureProcess,
  runObserveExecutable,
  getPort,
  validateCpuProfile,
  runCommandWithClient,
  isPortInUse
}
