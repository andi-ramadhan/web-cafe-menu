const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['coffee', 'nonCoffee', 'food']
  }
}, {
  timestamps: true,
  collection: 'menu'
});

module.exports = mongoose.model('Menu', menuSchema);