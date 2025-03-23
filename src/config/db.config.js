const mongoose = require('mongoose');
const config = require('../utils/config');
require('dotenv').config();

const dbURI = `mongodb://${config.mongo.usr}:${config.mongo.pwd}@${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log(`MongoDB connected on mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`);

    // handle db connections error after initial connection
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB disconnected');
    });

    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;