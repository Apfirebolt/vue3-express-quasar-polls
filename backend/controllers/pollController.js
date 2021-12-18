import asyncHandler from 'express-async-handler';
import Poll from '../models/pollModel.js';

// @desc    Get all polls
// @route   GET /api/polls
// @access  Public
const getPolls = asyncHandler(async (req, res) => {
  const polls = await Poll.find({ title: { $regex: req.query.term ? req.query.term : '' } })
  .populate('createdBy', 'username');
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

  if (choices.length < 3 || choices.length > 10) {
    res.status(400);
    throw new Error('Add at least 3 choices and the upper limit for maximum choices is 10');
  }

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
  let user;
  if (req.params.id) {
    user = req.params.id;
  } else {
    user = req.user._id
  }
  const userPolls = await Poll.find({ createdBy: user })
    .populate('createdBy', 'username')

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
  const poll = await Poll.findOne({ _id: req.params.id })
    .populate('votes.voted_by', 'username');

  if (!poll) {
    res.status(404);
    throw new Error('Poll not found');
  }

  res.json(poll);
});

// @desc    Add your vote in a poll
// @route   PUT /api/polls/:id/add_vote
// @access  Private
const addVoteToPoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findOne({ _id: req.params.id });

  if (poll.createdBy === req.user._id) {
    res.status(400);
    throw new Error('You cannot vote on your own poll');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const alreadyVoted = poll.votes.find((item) => item.voted_by.toHexString() === req.user._id.toHexString())
  if (alreadyVoted) {
    res.status(400);
    throw new Error('You have already voted on this poll');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  poll.votes.push({
    voted_by: req.user._id,
    selectedChoice: req.body.choice
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await poll.save();

  if (!poll) {
    res.status(404);
    throw new Error('Poll not found');
  }

  res.json({ message: 'Successfully voted on this poll' });
});

// @desc    Remove your vote from a poll
// @route   PUT /api/polls/:id/remove_vote
// @access  Private
const removeVoteToPoll = asyncHandler(async (req, res) => {
  const poll = await Poll.findOneAndUpdate({ _id: req.params.id },
    {
      $pull: { 'votes': { 'voted_by': req.user._id }}
    },
    {'new': true});

  if (!poll) {
    res.status(404);
    throw new Error('Poll not found');
  }

  res.json({ message: 'Removed your vote from this poll' });
});

export {
  getPolls,
  createPoll,
  getUserPolls,
  getSinglePoll,
  deleteSinglePoll,
  updateSinglePoll,
  addVoteToPoll,
  removeVoteToPoll
};
