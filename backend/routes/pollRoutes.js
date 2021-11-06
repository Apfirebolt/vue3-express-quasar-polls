import express from 'express';
const router = express.Router();

import {
  getPolls,
  createPoll,
  getSinglePoll,
  getUserPolls,
  deleteSinglePoll,
  updateSinglePoll
} from '../controllers/pollController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getPolls).post(protect, createPoll);
router.route('/my_polls').get(protect, getUserPolls);
router.route('/:id').get(getSinglePoll).delete(protect, deleteSinglePoll).put(protect, updateSinglePoll);

export default router;
