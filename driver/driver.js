'use strict';

// const inquirer = require('inquirer');
// const net = require('net');
require('dotenv').config();

const io = require('socket.io-client');
const driverSocket = io.connect('http://localhost:3000/caps');

// Emitting to 'subscribe event handler in queue-server
driverSocket.emit('join', process.env.STORE_NAME);

// Hey server, please give me all the messages I missed - Event name in string
driverSocket.emit('getall');

driverSocket.on('pickup', payload => {

  driverSocket.emit('received', payload.orderID);

  setTimeout(() => {
    console.log('picking up', payload.orderID);
    driverSocket.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    console.log('Delivering', payload.orderID);
    driverSocket.emit('delivered', payload);
  }, 3000);
});









