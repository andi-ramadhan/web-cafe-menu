const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

mongoose.connect(dbURI, {
  userNewUrlParser: true,
  userUnifiedTopology: true
}).then(() => console.log(`MongoDB connected on DB:${process.env.MONGO_DB}`))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;