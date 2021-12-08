import express from 'express';
const router = express.Router();

import {
  getUsers,
  getSingleUser,
} from '../controllers/userController.js';

import {
  getUserPolls
} from '../controllers/pollController.js';

router.route('/').get(getUsers)
router
  .route('/:username')
  .get(getSingleUser)
router
  .route('/:id/polls')
  .get(getUserPolls)

export default router;
