const { Schema, Types, model } = require('mongoose');

const DOCUMENT_NAME = 'Message';
const COLECTION_NAME = 'Messages';

const messageSchema = Schema(
  {
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    peopleWacthed: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        emoji: { type: String, default: null },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    message: {
      content: String,
      type: { type: String, enum: ['text', 'notify_call', 'notify'], default: 'text' },
    },
  },
  {
    timestamps: true,
    collection: COLECTION_NAME,
  },
);
const MessageModel = model(DOCUMENT_NAME, messageSchema);
module.exports = MessageModel;
