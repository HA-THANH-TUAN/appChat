let { model, Schema } = require('mongoose');
const validator = require('validator');

const DOCUMENT_NAME = 'User';
const COLECTION_NAME = 'Users';

const userSchema = Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      maxLength: 150,
      trim: true,
      validate: {
        validator: (name) => {
          const regex = /^[A-Za-z][\w\s]+$/;
          return regex.test(name);
        },
        message: 'Name is invalid.',
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Email is invalid.',
      },
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    role: {
      type: Array,
      default: [],
    },
    friends: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          require: true,
        },
      ],
    },
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FriendRequest',
      },
    ],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  },
  {
    timestamps: true,
    collection: COLECTION_NAME,
  },
);
userSchema.index({ name: 'text' });

module.exports = model(DOCUMENT_NAME, userSchema);
