import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

//@desc  Fetch all products
//@route GET /api/products
//@access Fetch all products

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//@desc  Fetch single products
//@route GET /api/products/:id
//@access Fetch all products

export default router;
