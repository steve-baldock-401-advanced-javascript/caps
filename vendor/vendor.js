'use strict';

require('dotenv').config();

// Helps get user input from command line
const inquirer = require('inquirer');
// TCP Library
const net = require('net');
var faker = require('faker');

const client = new net.Socket();

// const emitter = require('../lib/events.js');
const port = process.env.PORT || 3000;
const host = process.env.LOCALHOST || 'localhost';
client.connect(port, host, () => {
  console.log('Vendor successfully connected to', host, ':', port);
 });


// client.connect('data', buffer => {
//   let raw = buffer.toString();
//   let object = JSON.parse(raw);
//   checkForDelivered(object);
// });
// function checkForDelivered(object){
//   if(object.event === 'delivered'){
//     console.log('thank you for delivering', object.payload.orderID);
//   }
// }

// function mockDelivery() {
//   const storeInfo = {
//     event: 'pickup',
//     time: new Date(),
//     payload: {
//       store: `${faker.phone.phoneNumber()}`,
//       orderID: `${faker.random.number()}`,
//       customer: `${faker.name.findName()}`,
//       address: `${faker.address.streetAddress()}`,
//     }
//   }
//   return storeInfo;

// }

// setInterval(() => {
//   sendNewOrder()
// }, 5000);

// function sendNewOrder(){
//   let newPackage = JSON.stringify(mockDelivery());
//   socket.write(newPackage);
// }




