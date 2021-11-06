import asyncHandler from 'express-async-handler';
import Poll from '../models/pollModel.js';

// @desc    Get all polls
// @route   GET /api/polls
// @access  Public
const getPolls = asyncHandler(async (req, res) => {
  const polls = await Poll.find({});
  res.json(polls);
});

// @desc    Create a Poll
// @route   POST /api/polls
// @access  Private
const createPoll = asyncHandler(async (req, res) => {
  const { title, description, choices } = req.body;

  const pollExists = await Poll.findOne({
    createdBy: req.user._id,
    title: req.body.title,
  });

  if (pollExists) {
    res.status(409);
    throw new Error('You have already created a poll with this title');
  }

  const pollCreated = await Poll.create({
    createdBy: req.user._id,
    title,
    description,
    choices,
  });
  res.send({ poll: pollCreated, message: 'New poll created successfully' });
});

// @desc    Get all polls created by a given user
// @route   GET /api/myPolls
// @access  Private
const getUserPolls = asyncHandler(async (req, res) => {
  const userPolls = await Poll.find({ createdBy: req.user._id });

  res.json(userPolls);
});

// @desc    Delete a single poll
// @route   DELETE /api/polls/:id
// @access  Private
const deleteSinglePoll = asyncHandler(async (req, res) => {
  const pollDeleted = await Poll.deleteOne({
    createdBy: req.user._id,
    _id: req.params.id,
  });

  if (pollDeleted) {
    res.json({ message: 'Poll deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Poll not found');
  }
});

// @desc    Update a single poll
// @route   PUT /api/polls/:id
// @access  Private
const updateSinglePoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findOneAndUpdate(
    { createdBy: req.user._id, _id: req.params.id },
    {
      $set: {
        choices: req.body.choices,
        title: req.body.title,
        description: req.body.description,
      },
    },
    {
      new: true,
    }
  );

  if (poll) {
    res.status(200).json({
      poll,
      message: 'Poll updated',
    });
  } else {
    res.status(404);
    throw new Error('Poll not found');
  }
});

// @desc    Get single poll details
// @route   GET /api/polls/:id
// @access  Public
const getSinglePoll = asyncHandler(async (req, res) => {
  const poll = await Poll.find({ _id: req.params.id });

  if (pollExists) {
    res.status(404);
    throw new Error('Poll not found');
  }

  res.json(poll);
});

export {
  getPolls,
  createPoll,
  getUserPolls,
  getSinglePoll,
  deleteSinglePoll,
  updateSinglePoll,
};
