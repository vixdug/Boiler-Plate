const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 5000;
const uuid = require('node-uuid');
const util = require('util');
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = (data) => {

  wss.clients.forEach((client) => {
    console.log("sending to client")
    client.send(data);
  });
};


function sendClientCount() {
  wss.broadcast(JSON.stringify({
    type: 'clientCount',
    count: wss.clients.size
  }));
}


wss.on('connection', (socket) => {
  console.log("in here", wss.clients.size)
  sendClientCount();
  socket.on('message', (message, username) => {
    const parseMessage = JSON.parse(message);
    var newMessage = {};

    if (parseMessage.type === "postMessage") {
      newMessage = {
        type: "incomingMessage",
         id: uuid.v1(),
        username: parseMessage.username,
        message: parseMessage.message
      };
      console.log(newMessage);
    }

    if (parseMessage.type === "postNotification") {
     newMessage = {
       type: "incomingNotification",
       id: uuid.v1(),
       message: parseMessage.message
     };
   }

    wss.broadcast(JSON.stringify(newMessage));
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });

socket.on('close', () => {
    console.log('Client disconnected');
    sendClientCount();
  });
});

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
