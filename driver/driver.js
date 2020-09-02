'use strict';

const inquirer = require('inquirer');
const net = require('net');

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
client.connect(port, host, () => {
  console.log('Driver successfully connected to', host, ':', port);
});

require('dotenv').config();
// const emitter = require('../lib/events.js');
// require('../caps.js');

// emitter.on('pickup', inTransitHandler);
// emitter.on('in-transit', deliveredHandler);

// client.on('', )
// function inTransitHandler(order) {
// // wait one second
//   setTimeout( () => {
//     console.log(`Driver picked up ${order.orderID}`);
//     emitter.emit('in-transit', order);
//   }, 1000);
// }

// function deliveredHandler(order) {
//   setTimeout( () => {
//     console.log(`DRIVER: delivered ${order.orderID}`);
//     emitter.emit('delivered', order);
//   }, 3000);

// }