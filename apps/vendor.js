'use strict';

require('dotenv').config();
var faker = require('faker');
let storeName = process.env.STORE_NAME;
const emitter = require('../lib/events.js');


const randomStore = `${faker.phone.phoneNumber()}`;
const randomOrderID = `${faker.random.number()}`;
const randomOrderName = `${faker.name.findName()}`;
const randomAddress = `${faker.address.streetAddress()}`;

emitter.on('pickup', orderHandler);
emitter.on('delivered', deliveryHandler);


function orderHandler() {
  setInterval('pickup', () => {
    let delivery = {
      store: randomStore,
      orderID: randomOrderID,
      customer: randomOrderName, 
      address: randomAddress,
    };
    // Need to figure out how to create new delivery object below
    // .create(delivery);
    emitter.emit('pickup', delivery);
  }, 5000); 
  
}

function deliveryHandler(order) {
  console.log(`Thank you for delivering ${order.orderID}`);
}


module.exports = {
  orderHandler,
  deliveryHandler,
};

