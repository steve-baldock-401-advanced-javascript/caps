const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

// this file is emitting from test2
socket.emit('sunrise', 'windy');

socket.emit('sunset', 'dusky now');


const weatherSocket = io.connect('http://localhost:3000/weather');

weatherSocket.emit('snow', 'did you get this???');

// Emergency "room" for test 1 and test 2
const emergency = io.connect(url);

emergency.emit('fire', 'and cat in tree');