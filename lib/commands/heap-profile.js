'use strict';

const Client = require('../internal/inspector-client');

async function run(host, port, stream, options={}) {
  const client = new Client(host, port);
  await client.connect();

  const samplingInterval = options.samplingInterval || 512 * 1024;
  const duration = (options.duration || 60) * 1000;

  await client.post("HeapProfiler.enable");
  await client.post("HeapProfiler.startSampling", {samplingInterval});

  // Wait for 60 seconds
  await new Promise((res) => setTimeout(res, duration));

  const res = await client.post("HeapProfiler.stopSampling");
  const { profile } = res;
  stream.write(JSON.stringify(profile));

  client.disconnect();
}

module.exports = { run };
