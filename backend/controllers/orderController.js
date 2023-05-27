import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // console.log(req.user._id);
    const order = new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // console.log(order);
    try {
      const createdOrder = await order.save();
      console.log(createdOrder);
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      // Handle the error and send an appropriate response
      res.status(500).json({ message: 'Error creating order' });
    }
  }
});

// @desc    Create new order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  console.log('runnung gerierhdjkskjd');
  // console.log(req.params.id);
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  console.log(order);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
});

export { addOrderItems, getOrderById };
