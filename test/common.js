'use strict'

const EventEmitter = require('events');
const { fork } = require('child_process');

function startFixtureProcess(t, withInspector = false) {
  const execArgv = [ '--inspect-port', '0' ];
  if (withInspector) {
    execArgv.push('--inspect');
  }
  const child = fork('./test/fixtures/default-program.js', { execArgv, silent: true});
  const fixture = new FixtureProcess(child);
  fixture.on('timeout', t.fail);
  return fixture;
}

class FixtureProcess extends EventEmitter {
  constructor(p) {
    super();
    this._p = p;
    this.pid = p.pid;
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
}

module.exports = { startFixtureProcess, FixtureProcess }
