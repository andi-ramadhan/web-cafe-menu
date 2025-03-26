const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
  menuId: {
    type: String,
    required: true,
  },
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
    immutable: true,
    enum: ['coffee', 'nonCoffee', 'food']
  }
}, {
  timestamps: true,
  collection: 'menu',
  versionKey: false
});

module.exports = mongoose.model('Menu', menuSchema);