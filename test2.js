'use strict';

// Connect in client - Separate file from above
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000');

// test.js is sending to this file
socket.on('sunrise', payload => {
  console.log('Oh what a beautiful morning');
});

socket.on('sunset', payload => {
  console.log('What a lovely evening', payload);
});

// corresponding to line 21 on test.js
const weatherChannel = io.connect('http://localhost:3000/weather');

weatherChannel.on('snow', payload => {
  console.log('Close the schools', payload);
});

weatherChannel.on('sunrise', payload => {
  console.log('Time to go to school', payload);
});

// corresonding to emergency room
const emergencyChannel = io.connect(url);
emergencyChannel.emit('join', 'fireDepartment');

emergencyChannel.on('fire', payload => {
  console.log('Stop, drop and roll...almost there..');
});


