import asyncHandler from 'express-async-handler';
import Poll from '../models/pollModel.js';

// @desc    Get all polls
// @route   GET /api/polls
// @access  Public
const getPolls = asyncHandler(async (req, res) => {
  const polls = Poll.find({});
  res.json(polls);
});

export { getPolls };
