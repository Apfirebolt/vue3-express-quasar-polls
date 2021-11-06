import express from 'express';
const router = express.Router();
import { check } from 'express-validator';
import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/authController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
