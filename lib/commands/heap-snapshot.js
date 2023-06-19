'use strict';

async function run(client, stream) {
  await client.post("HeapProfiler.enable");
  client.on("HeapProfiler.addHeapSnapshotChunk", ({ chunk }) => {
    stream.write(chunk);
  });
  await client.post("HeapProfiler.takeHeapSnapshot");
}

module.exports = { run };
