const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length === 0) return res.status(404).json({ message: 'No users found' });

    const randomUser = users[Math.floor(Math.random() * users.length)];

    const token = jwt.sign({
      id: randomUser.id,
      username: randomUser.username
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    req.token = token;
    req.users = users;
    req.currentUser = randomUser

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) return res.status(404).json({ message: 'No products found' });

    req.products = products;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchToken = express.Router().get('/generate-token', generateToken, (req, res) => {
  res.json({ 
    token: req.token,
    users: req.users,
    currentUser: req.currentUser
  });
});

exports.fetchProduct = express.Router().get('/generate-product', generateProducts, (req, res) => {
  res.json({ 
    products: req.products
  });
});