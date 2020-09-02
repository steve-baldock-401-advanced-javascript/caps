'use strict';

// const inquirer = require('inquirer');
const net = require('net');

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
client.connect(port, host, () => {
  console.log('Driver successfully connected to', host, ':', port);
});

require('dotenv').config();

client.on('data', buffer => {
  let object = JSON.parse(buffer);

  if(object.event === 'pickup') {
    checkForPickup(object);
  } else if (object.event === 'in-transit'){
    console.log('in-transit');
    simulateDelivery(object);
  } 

});

function checkForPickup(object){
  setTimeout(() => {
    console.log('picking up', object.payload.orderID);
    let newOrder = JSON.stringify(orderInTransit(object.payload));
    client.write(newOrder);
  }, 1000);
  
}

function orderInTransit(object) {
  const orderInfo = {
    event: 'in-transit',
    payload: object,
  };
  return orderInfo;
}

function simulateDelivery(object){
  setTimeout(() => {
    let newOrder = JSON.stringify(deliveryConfirmation(object.payload));
    client.write(newOrder);
  }, 3000);
}

function deliveryConfirmation (object) {
  const orderInfo = {
    event: 'delivered',
    payload: object,
  };
  return orderInfo;
}