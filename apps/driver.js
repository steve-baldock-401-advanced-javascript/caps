'use strict';

require('dotenv').config();
const emitter = require('../lib/events.js');
require('../caps.js');


// this is demo code

emitter.on('pickup', inTransitHandler);
emitter.on('delivered', deliveredHandler);

function inTransitHandler(order) {
// wait one second
  setTimeout('pickup', () => {
    console.log(`Driver picked up ${order.orderID}`);
    emitter.emit('in-transit', order.orderID);
  }, 1000);
}

// wait three seconds
function deliveredHandler(order) {
  setTimeout('pickup', () => {
    console.log(`DRIVER: delivered ${order.orderID}`);
    emitter.emit(`delivered, ${order.orderID}`);
  }, 3000);

}