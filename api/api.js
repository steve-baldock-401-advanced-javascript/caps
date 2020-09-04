'use strict';

const io = require('socket.io-client');
const express = require('express');
const cors = require('cors');
var faker = require('faker');
// const {v4:uuid} = require('uuid');

const socket = io.connect('http://localhost:3000/caps');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3001;

app.post('/pickup', (req, res) => {
  
  const hasBody  = Object.keys(req.body).length;

  const defaultStore = {
    store: process.env.STORE_NAME || 'stevestore',
    // orderID: {v4:uuid},
    orderID: `${faker.random.number()}`,
    customer: `${faker.name.findName()}`,
    address: `${faker.address.streetAddress()}`,
  };
  
  const delivery = hasBody ? req.body : defaultStore;

  socket.emit('pickup', delivery);
  res.status(200).send('scheduled');
});

app.listen(PORT, () => { });
