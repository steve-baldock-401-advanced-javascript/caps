'use strict';


// Networking library included with Node JS
const net = require('net');

require('dotenv').config();
const port = process.env.PORT || 3000;
const server = net.createServer();

// this is old caps.js stuff
// server.on('pickup', payload => logEvent('pickup', payload));
// server.on('in-transit', payload => logEvent('in-transit', payload));
// server.on('delivered', payload => logEvent('delivered', payload));


server.listen(port, () => console.log(`Server up on ${port}`));

// Create a list of clients that have connected to us
let socketPool = {};

server.on('connection', (socket) => {
  //give each client a unique ID number
  const id = `Socket-${Math.random()}`;
  // Add them to the list (for later)
  socketPool[id] = socket;

  //Here's what we do when events come in
  socket.on('data', buffer => dispatchEvent(buffer.toString()));

  socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
  socket.on('end', () => deleteSocket(socket.id));
});

function dispatchEvent(message) {
  logEvent(message);
  broadcast(message);
}

function logEvent(message) {
  const time = new Date();
  const messageObj = JSON.parse(message);
  const eventName = messageObj.event;
  const payload = messageObj.payload; 
  console.log('EVENT', {event:eventName, time, payload });
}

// Need to loop over every socket connection and manually send message to them
function broadcast(message) {
  let payload = JSON.stringify(message);
  for(let socket in socketPool) {
    socketPool[socket].write(payload);
  }
}

function deleteSocket(id) {
  delete socketPool[id];
}