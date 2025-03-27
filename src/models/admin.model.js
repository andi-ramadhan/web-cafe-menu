const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'admin',
  versionKey: false
});

// prevent password from being sent in responses
adminSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

module.exports = mongoose.model('Admin', adminSchema);