'use strict';

// const net = require('net');
// Networking library included with Node JS
require('dotenv').config();
// const port = process.env.PORT || 3000;
// const server = net.createServer();
// server.listen(port, () => console.log(`Server up on ${port}`));

const io = require('socket.io')(process.env.PORT || 3000);

const caps  = io.of('/caps');

caps.on('connection', (socket) => {
  console.log('CAPS ROOM', socket.id);

  socket.on('join', room  => {
    console.log('joined', process.env.STORE_NAME);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    caps.emit('pickup', payload);
    console.log('PICKUP ORDER', payload);
  });

  socket.on('in-transit', (payload) => {
    caps.to(process.env.STORE_NAME).emit('in-transit', payload);
    console.log('ORDER IN-TRANSIT', payload);
  });

  socket.on('delivered', (payload) => {
    caps.to(process.env.STORE_NAME).emit('delivered', payload);
    console.log('DELIVERED', payload);
  });
});



