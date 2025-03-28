const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const Admin = require('../models/admin.model');
const { secret, tokenExpiration } = require('../config/auth.config');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = `admin-${nanoid(5)}`;

    const admin = await Admin.create({
      userId,
      username,
      password,
      role: 'admin'
    });

    res.status(201).json({
      status: 'success',
      message: 'Admin registered successfully',
      data: {
        userId: admin.userId,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const validPassword = await admin.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { userId: admin.userId },
      secret,
      { expiresIn: tokenExpiration }
    );

    res.json({
      status: 'success',
      data: {
        token,
        admin: {
          userId: admin.userId,
          username: admin.username,
          role: admin.role
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};