import express from 'express';
const router = express.Router();
import products from '../data/products.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

//@desc  Fetch all products
//@route GET /api/products
//@access Fetch all products

router.route('/').get(getProducts).post(protect, admin, createProduct);

//@desc  Fetch single products
//@route GET /api/products/:id
//@access Fetch all products

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
