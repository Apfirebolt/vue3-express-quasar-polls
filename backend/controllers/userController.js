import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get all users or search user
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ username: { $regex: req.query.term ? req.query.term : '' } });
  res.json(users);
});

// @desc    Get single user details
// @route   GET /api/users/:id
// @access  Public
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.params.id });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

export {
  getUsers,
  getSingleUser,
};
