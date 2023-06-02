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

//@desc  Delete single products
//@route DELETE /api/products/:id
//@access PRIVATE/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product Deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc  Create a products
//@route POST /api/products/:id
//@access PRIVATE/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample',
    price: 0,
    user: req.user._id,
    brand: 'brand Name',
    image: 'images/sample.jpg',
    category: 'Sample Brand',
    countInStock: 0,
    numReview: 0,
    description: 'Description Data',
  });
  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//@desc  Update a products
//@route PUT /api/products/:id
//@access PRIVATE/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, category, countInStock, brand, description } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.category = category;
    product.countInStock = countInStock;
    product.brand = brand;
    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});
export {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
};
