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

// client.on('data', inTransitHandler(order) {
//     let event = JSON.parse(order);

//     if(event.event === '') {

//     }
// })

client.on('data', buffer => {
  let raw = buffer.toString();
  let object = JSON.parse(raw);
  checkForPickup(object);
  simulateDelivery(object);
});

function checkForPickup(object){
  if(object.event === 'pickup'){
    setTimeout(() => {
      console.log('picking up', object.payload.orderID);
    }, 1000);
    let newOrder = JSON.stringify(orderInTransit());
    client.write(newOrder);
  } 
}

function orderInTransit() {
  const orderInfo = {
    event: 'in-transit',
    payload: storeInfo.payload,
  };
  return orderInfo;
}


function simulateDelivery(){
  setTimeout(() => {
    let newOrder = JSON.stringify(deliveryConfirmation());
    client.write(newOrder);
  }, 3000);
}

function deliveryConfirmation () {
  const orderInfo = {
    event: 'delivered',
    payload: storeInfo.payload,
  };
  return orderInfo;
}