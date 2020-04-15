'use strict';

const Client = require('../internal/inspector-client');

async function run(host, port, stream) {
  const client = new Client(host, port);
  await client.connect();

  await client.post("HeapProfiler.enable");
  client.on("HeapProfiler.addHeapSnapshotChunk", ({ chunk }) => {
    stream.write(chunk);
  });
  await client.post("HeapProfiler.takeHeapSnapshot");
  await client.disconnect();
}

module.exports = { run };
