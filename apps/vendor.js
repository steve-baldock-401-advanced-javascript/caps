'use strict';

require('dotenv').config();
var faker = require('faker');
let storeName = process.env.STORE_NAME;
const emitter = require('../lib/events.js');

emitter.on('delivered', deliveryHandler);

const randomStore = `${faker.phone.phoneNumber()}`;
const randomOrderID = `${faker.random.number()}`;
const randomOrderName = `${faker.name.findName()}`;
const randomAddress = `${faker.address.streetAddress()}`;



function deliveryHandler() {
  setInterval(order, () => {
    let delivery = {
      store: randomStore,
      orderID: randomOrderID,
      customer: randomOrderName, 
      address: randomAddress,
    };
    emitter.emit('pickup', delivery);
    console.log(order);
  }, 5000); 
  
};




