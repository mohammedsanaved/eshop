import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc  Fetch all products
//@route GET /api/products
//@access Fetch all products

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc  Fetch single products
//@route GET /api/products/:id
//@access PUBLIC Fetch all products
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
export { getProductById, getProducts };