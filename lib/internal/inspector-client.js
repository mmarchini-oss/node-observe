'use strict'

const net = require('net');
const http = require('http');
const { EventEmitter } = require('events');

const WebSocket = require('ws');

function getWebSocketPath(host, port) {
  return new Promise((resolve, reject) => {
    http.get(`http://${host}:${port}/json`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => resolve(JSON.parse(data)[0].webSocketDebuggerUrl));
      resp.on('error', (e) => reject(e));
    }).on('error', reject);
  });
}

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function waitForConnection (host, port) {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port }, () => { socket.end(); resolve() });
    socket.on('error', reject);
  });
}

async function isInspectorOpen(host, port) {
  // make number of retries configurable?
  let retries = 5;
  let portOpen = false;
  do {
    try {
      await waitForConnection(host, port);
      portOpen = true;
    } catch (e) {
      // make timeout between attempts configurable?
      await timeout(75);
    }
  } while (!portOpen && retries-- > 0);
  return portOpen;
}

function handleMessages(data) {
  const { id, method, result, params} = JSON.parse(data);
  if (id) {
    const { method, resolve } = this._pendingMessages[id];
    resolve(result);
    this.emit('debugEvent', { id, method, result });
    delete this._pendingMessages[id];
  } else {
    this.emit('debugEvent', { method, params });
    this.emit(method, params);
  }
}

class Client extends EventEmitter {
  constructor(host, port) {
    super();
    this.host = host;
    this.port = port;
    this._currentId = 1;
    this._pendingMessages = {};
  }

  async connect() {
    const { host, port } = this;
    if (!await isInspectorOpen(host, port)) {
      throw new Error('Inspector not available', { host, port });
    }
    const url = await getWebSocketPath(host, port);
    this._ws = new WebSocket(url);
    this._ws.on('message', handleMessages.bind(this));
    return new Promise((resolve) => {
      // TODO(mmarchini): reject?
      this._ws.on('open', resolve);
    })
  }

  disconnect() {
    return new Promise((resolve) => {
      // TODO(mmarchini): reject?
      this._ws.on('close', resolve);
      this._ws.close();
    })
  }

  post(method, params) {
    params = params || {};
    return new Promise((resolve) => {
      // TODO(mmarchini): reject?
      const id = this._currentId++;
      this._pendingMessages[id] = { method, resolve };
      this._ws.send(JSON.stringify({method, params, id}));
    });
  }
}

module.exports = Client;
