'use strict';

require('dotenv').config();

// Helps get user input from command line
// const inquirer = require('inquirer');
// TCP Library
// const net = require('net');
var faker = require('faker');

const io = require('socket.io-client');
const vendorSocket = io.connect('http://localhost:3000/caps');

vendorSocket.emit('join', process.env.STORE_NAME);

  setInterval(() => {
    const order = {
      time: new Date(),
      store: process.env.STORE_NAME || 'stevestore',
      orderID: `${faker.random.number()}`,
      customer: `${faker.name.findName()}`,
      address: `${faker.address.streetAddress()}`,
    };
      vendorSocket.emit('pickup', order);
    }, 5000);

    vendorSocket.on('delivered', (payload) => {
      console.log(`Thank you for delivering ${payload.orderID}`);
    });













