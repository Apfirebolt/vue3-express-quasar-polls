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
        voted_by: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
