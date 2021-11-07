import express from 'express';
const router = express.Router();

import {
  getUsers,
  getSingleUser,
} from '../controllers/userController.js';

router.route('/').get(getUsers)
router
  .route('/:id')
  .get(getSingleUser)

export default router;
