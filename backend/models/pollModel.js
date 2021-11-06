import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    votes: [
      {
        voted_by: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'User',
        },
        selectedChoice: {
          type: String,
          required: true,
        },
      }
    ],
    choices: [
      {
        name: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
