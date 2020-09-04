'use strict';

// const net = require('net');
// Networking library included with Node JS
require('dotenv').config();

// const port = process.env.PORT || 3000;
// const server = net.createServer();
// server.listen(port, () => console.log(`Server up on ${port}`));

const io = require('socket.io')(process.env.PORT || 3000);

// demo from afternoon lab
const messages = {
 
};

const caps  = io.of('/caps');

io.on('connection', (socket) => {
  console.log('CORE', socket.id);
});


caps.on('connection', (socket) => {

  // Moved this to queue-server file
  socket.on('join', room  => {
    console.log('joined', process.env.STORE_NAME);
    socket.join(room);
  });

  // Received handler
  socket.on('received', orderID => {
    delete messages[orderID];
    console.log('deleting', orderID, messages);
  });

  socket.on('getAll', () => {
    for(let id in messages){
      const payload = messages[id];
      caps.emit('pickup', payload);
    }
  });

  socket.on('pickup', (payload) => {
    // need to queue up pickup messages
    messages[payload.orderID] = payload;
    logIt('pickup', payload);
    caps.emit('pickup', payload);
    console.log('pickup', Object.keys(messages).length);
  });

  socket.on('in-transit', (payload) => {
    logIt('in-transit', payload);
    caps.to(process.env.STORE_NAME).emit('in-transit', payload);
    console.log('ORDER IN-TRANSIT', payload);
  });

  socket.on('delivered', (payload) => {
    logIt('deliverd', payload);
    caps.to(process.env.STORE_NAME).emit('delivered', payload);
    console.log('DELIVERED', payload);
  });
});

function logIt(event, payload) {
  let time = new Date();
  console.log({ time, event, payload });
}



