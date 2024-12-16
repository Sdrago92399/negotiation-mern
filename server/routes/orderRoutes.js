const express = require('express');
const { createOrder, updateOrder, fetchSellerOrders, fetchBuyerOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/api/orders', verifyToken, createOrder);
router.post('/api/orders/:orderId', verifyToken, updateOrder);
router.get('/api/orders/seller', verifyToken, fetchSellerOrders);
// router.get('/api/orders/buyer', verifyToken, fetchBuyerOrders);

module.exports = router;
