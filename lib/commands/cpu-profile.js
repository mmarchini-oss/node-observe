'use strict';

const Client = require('../internal/inspector-client');

async function run(host, port, stream, options={}) {
  const client = new Client(host, port);
  await client.connect();

  const duration = (options.duration || 60) * 1000;
  const interval = options.samplingInterval || undefined;

  await client.post("Profiler.enable");
  if (interval !== undefined) {
    await client.post("Profiler.setSamplingInterval", { interval });
  }
  await client.post("Profiler.start");

  // Wait for 60 seconds
  await new Promise((res) => setTimeout(res, duration));

  const res = await client.post("Profiler.stop");
  const { profile } = res;
  stream.write(JSON.stringify(profile), res);

  await client.post("Profiler.disable");
  client.disconnect();
}

module.exports = { run };
