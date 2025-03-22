require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');
const app = express();
const menuRoutes = require('./src/routes/menu.routes');

const port = process.env.PORT

app.use('/', menuRoutes);

const server = app.listen(port, async () => {
  console.log(`App listening on port ${port}`)
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/cafe-menu');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
  }
});

server;