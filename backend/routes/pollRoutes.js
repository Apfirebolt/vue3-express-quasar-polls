import express from 'express';
const router = express.Router();

import {
  getPolls,
  createPoll,
  getSinglePoll,
  getUserPolls,
  deleteSinglePoll,
  updateSinglePoll,
  addVoteToPoll,
  removeVoteToPoll
} from '../controllers/pollController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getPolls).post(protect, createPoll);
router.route('/my_polls').get(protect, getUserPolls);
router
  .route('/:id')
  .get(getSinglePoll)
  .delete(protect, deleteSinglePoll)
  .put(protect, updateSinglePoll);
router
  .route('/:id/add_vote')
  .put(protect, addVoteToPoll)
router
  .route('/:id/remove_vote')
  .put(protect, removeVoteToPoll)

export default router;
