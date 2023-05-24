import express from 'express';
const router = express.Router();
import products from '../data/products.js';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

//@desc  Fetch all products
//@route GET /api/products
//@access Fetch all products

router.route('/').get(getProducts);

//@desc  Fetch single products
//@route GET /api/products/:id
//@access Fetch all products

router.route('/:id').get(getProductById);

export default router;
