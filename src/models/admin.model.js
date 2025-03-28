const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const saltGen = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltGen);
    next();
  } catch (err) {
    next(err);
  }
});

adminSchema.methods.comparePassword = async function(targetPassword) {
  return bcrypt.compare(targetPassword, this.password);
};

// prevent password from being sent in responses
adminSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

module.exports = mongoose.model('Admin', adminSchema);