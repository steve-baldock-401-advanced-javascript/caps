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


client.on('data', buffer => {
  let raw = buffer.toString();
  let object = JSON.parse(raw);
  if(object.event === 'delivered'){
    console.log('thank you for delivering', object.payload.orderID);
  } else {
    return;
  }
});

// function checkForDelivered(object){
//   if(object.event === 'delivered'){
//     console.log('thank you for delivering', object.payload.orderID);
//   } else {
//     return;
//   }
// }

function mockDelivery() {
  const orderInfo = {
    event: 'pickup',
    payload: {
      time: new Date(),
      store: `${faker.phone.phoneNumber()}`,
      orderID: `${faker.random.number()}`,
      customer: `${faker.name.findName()}`,
      address: `${faker.address.streetAddress()}`,
    }
  }
  return orderInfo;
}

setInterval(() => {
  sendNewOrder()
}, 5000);

function sendNewOrder(){
  let newOrder = JSON.stringify(mockDelivery());
  client.write(newOrder);
}




