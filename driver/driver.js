'use strict';

// const inquirer = require('inquirer');
// const net = require('net');

const io = require('socket.io-client');
const driverSocket = io.connect('http://localhost:3000/caps');

driverSocket.emit('join', process.env.STORE_NAME);

driverSocket.on('pickup', payload => {
  setTimeout(() => {
    console.log('picking up', payload.orderID);
    driverSocket.emit('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    console.log('Delivering', payload.orderID);
    driverSocket.emit('delivered', payload);
  }, 3000);
});






