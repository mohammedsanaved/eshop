import express from 'express';
const router = express.Router();
import products from '../data/products.js';
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

//@desc  Fetch all products
//@route GET /api/products
//@access Fetch all products

router.route('/').get(getProducts);

//@desc  Fetch single products
//@route GET /api/products/:id
//@access Fetch all products

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
