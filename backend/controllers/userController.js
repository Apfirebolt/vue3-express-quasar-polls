import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get all users or search user
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  
  const users = await User.find({ '$or': [
    { 'username': { '$regex': req.query.term ? req.query.term : ''} }, 
    { 'firstName': { '$regex': req.query.term ? req.query.term : '' }},
    { 'lastName': { '$regex': req.query.term ? req.query.term : '' }},
    { 'email': { '$regex': req.query.term ? req.query.term : '' }}
]})
  .select('-password');
  res.json(users);
});

// @desc    Get single user details
// @route   GET /api/users/:id
// @access  Public
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  .select('-password');

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
