'use strict';

async function run(client, stream, options={}) {
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
  stream.write(JSON.stringify(profile));

  await client.post("Profiler.disable");
}

module.exports = { run };
