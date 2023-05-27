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
      name: req.user,
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

export { addOrderItems };
