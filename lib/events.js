'use strict';

// should export an event emitter instance, not a class
// This is called a Singleton

const EventEmitter = require('events');

const emitter = new EventEmitter();

module.exports = emitter;
