# Observe 🕵‍♀

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/mmarchini/node-observe/CI/master?style=flat-square)
![Codecov branch](https://img.shields.io/codecov/c/github/mmarchini/node-observe/master)
![npm](https://img.shields.io/npm/v/@mmarchini/observe)

CLI tool to run common Inspector Protocol tasks on remote Node.js processes.

## Why

There are several tools to interact with the Inspector Protocol. The 
[`Inspector API`](https://nodejs.org/api/inspector.html) on Node.js core allows 
users to automate inspector protocol tasks, but it only interacts with the 
protocol within a Node.js process (it doesn't connect to external processes). 
[`node-inspect`](https://github.com/nodejs/node-inspect) can connect to
external processes, but since it's a REPL which doesn't allow for automation. 

[chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)
addresses both issues, but users need to know how to use the inspector protocol
to interact with it. Observe addresses that by providing shortcuts to common
tasks used in production, such as taking snapshots or profiles. This allows
users to get insights on their running applications without need to redeploy.

## Install

```console
$ npm install @mmarchini/observe
```

Or, use npx to get insights with a single command:

```console
$ npx -q @mmarchini/observe ...
```

> Note: since the result of `observe` is redirected to stdout, it's recommended
> to pass `-q` to `npx` to prevent unwanted lines in the output.

## Usage

To execute a command, run `npx -q @mmarchini/observe [command] [options]`. For
a full list of commands and options, run `npx -q @mmarchini/observe -h`.
Available commands are:

  * `heap-profile` will take a Heap Profile
  * `heap-snapshot` will take a Heap Snapshot

By default the result will be outputted to stdout, so it can be piped to
another process if needed without touching the filesystem (encryption, upload
to another server, compression, etc.). `--file` will save the result to the
filesystem instead.

All commands require at least one option: `-p <pid>` or 
`-h <host>`/`-P <port>`. `-p` will start the inspector protocol on the remote
process `<pid>` by sending a `SIGUSR2` signal to the process.

Each command might also have their own options. For example, `heap-profile`
accepts a `-d <duration>` option to determine for how long the profiler should
run. `npx -q @mmarchini/observe command -h` will show all available options for
the command.
