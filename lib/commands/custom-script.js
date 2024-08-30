'use strict';

const ObserveError = require('../internal/error');
const path = require('path');

async function run(client, stream, options={}) {
  const file = options['script'];

  if (!file) {
    throw new ObserveError('--script is required');
  }

  return require(path.join(process.cwd(), file)).run(client, stream)
}

module.exports = { run };
