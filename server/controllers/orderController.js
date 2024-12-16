const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const sendEmail = require('../utils/email');

// Create a new order (offer)
const createOrder = async (req, res) => {
  try {
    const { productId, offerAmount, notes } = req.body;

    const product = await Product.findById(productId).populate('seller');
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    const order = new Order({
      item: productId,
      buyerId: req.user.id, 
      sellerId: product.seller._id,
      offerAmount,
      comments: notes ? [{ commenter: req.user.id, text: notes }] : [],
    });

    await order.save();

    // sendEmail(
    //   product.seller.email,
    //   'New Offer Received',
    //   `You have received a new offer for product: ${product.name}.`
    // );

    res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      data: order,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, comments } = req.body;console.log(status)

    const order = await Order.findById(orderId).populate('buyerId item sellerId');
    if (!order) return res.status(404).json({ error: 'Order not found.' });

    order.status = status || order.status;
    if (comments) {
      order.comments.push({ commenter: req.user.id, text: comments });
    }
    await order.save();

    let message = `Your order of Rs.${order.offerAmount} for a ${order.item.name} has been updated to: ${status} by the seller ${order.sellerId.username}.`;
    if (comments) {
      message += `\nThey also left you a note:\n${comments}`;
    }
    if (status === 'rejected') {
      message += `\nYou can make a new offer and continue the negotiation.`;
    }
    if (status === 'accepted') {
      message += `\nCongrats! The item is yours.`;
    }

    sendEmail(
      order.buyerId.email,
      'Order Update',
      message
    );


    res.status(200).json({
      success: true,
      message: 'Order updated successfully.',
      data: order,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Fetch seller's orders with filters and sorting
const fetchSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id; 
    const { status, sort = '-updatedAt', page = 1, limit = 10 } = req.query;

    const filter = { sellerId };
    if (status) filter.status = status;

    const pageSize = parseInt(limit);
    const skip = (parseInt(page) - 1) * pageSize;

    const orders = await Order.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .populate('buyerId', 'name email')
      .populate('item', 'name')
      .lean();

    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully.',
      data: { orders, totalOrders, page, limit: pageSize },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Fetch buyer's orders
const fetchBuyerOrders = async (req, res) => {
  try {
    const buyerId = req.user.id; // Assuming buyer ID comes from auth middleware
    const { status, sort = '-updatedAt', page = 1, limit = 10 } = req.query;

    const filter = { buyerId };
    if (status) filter.status = status;

    const pageSize = parseInt(limit);
    const skip = (parseInt(page) - 1) * pageSize;

    const orders = await Order.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .populate('sellerId', 'name email')
      .populate('item', 'name')
      .lean();

    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully.',
      data: { orders, totalOrders, page, limit: pageSize },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  fetchSellerOrders,
};
