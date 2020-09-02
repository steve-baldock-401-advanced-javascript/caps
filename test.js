// Demo code below ---------------------------------------------------------------------------------------------
// Require socket.io dependency
const client = require('socket.io')(process.env.PORT || 3000);

// Test code from the lab
client.on('connection', (socket) => {
  console.log('CONNECTED SYSTEM WIDE', socket.id);
});

// respond to and manage events - everybody knows about sunrise
socket.on('sunrise', payload => {
  console.log('received sunrise message', payload);
  io.emit('sunrise', payload);
});

socket.on('sunset', payload => {
  io.emit('sunset', payload);
});

// Channels
// I'm part of this system, but a namespace section of it. I want to be in the 'weather' section (route)
const weather = io.of('/weather');

weather.on('connection', socket => {

  console.log('NOT SYSTEM WIDE WEATHER CHANNEL', socket.id);
});

// Rooms - different than channels
const emergency = io.of('/emergency');

emergency.on('connection', socket => {
  socket.on('join', room => {
    console.log('joined room');
    socket.join(room);
  });

  // In this room, we emit fire and payload
  socket.on('fire', payload => {
    emergency.to('fireDepartment').emit('fire', payload);
  })
});
