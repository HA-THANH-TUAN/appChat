let { model, Schema, Types } = require('mongoose');
const validator = require('validator');

const DOCUMENT_NAME_CONVERSATION = 'Conversation';
const COLLECTION_NAME_CONVERSATION = 'Conversations';

const COLLECTION_MEMBER_CONVERSATION = 'membersConversation';
const DOCUMENT_MEMBER_CONVERSATION = 'memberConversation';

const conversationSchema = Schema(
  {
    name: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      enum: ['personal', 'group'],
    },

    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },

    members: {
      type: [
        {
          _id: {
            type: Types.ObjectId,
            ref: 'User',
            alias: 'user',
          },
          alias: {
            type: String,
          },
          status: {
            type: String,
            enum: ['pending', 'accepted'],
            require: true,
          },
          role: {
            type: Schema.Types.Mixed,
            enum: ['member', 'leader', 'pending'],
          },
        },
      ],
    },
  },
  {
    collection: COLLECTION_NAME_CONVERSATION,
    timestamps: true,
  },
);

const ConversationModel = model(DOCUMENT_NAME_CONVERSATION, conversationSchema);

module.exports = {
  ConversationModel,
};
