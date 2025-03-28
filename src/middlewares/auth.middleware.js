const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');
const Admin = require('../models/admin.model');

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, secret);
    const admin = await Admin.findOne({ userId: decoded.userId});

    if (!admin || !admin.isActive) {
      return res.status(403).json({
        status: 'error',
        message: 'Invalid or inactive account'
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};