'use strict'

const ObserveError = require('./error');

// Starts the inspector protocol on a remote process
function startDebugger(pid) {
  try {
    process.kill(pid, 'SIGUSR1');
  } catch (e) {
    if (e.code === 'EPERM') {
      throw new ObserveError(`You're not authorized to start the inspector
protocol on process ${pid}. You might need to run with sudo, or provide --host
and --port instead of --pid`);
    } else if (e.code === 'ESRCH') {
      throw new ObserveError(`Process ${pid} doesn't exist`);
    }
    throw e;
  }
}

module.exports = { startDebugger };
