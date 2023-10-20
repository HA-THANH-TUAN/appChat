const express = require('express');
const { handleError } = require('../core/error.response');
const ChatController = require('../controllers/chat.controller');
const mongoose = require('mongoose');
const { uid } = require('uid');

const { ModelConversation, membersConversation } = require('../models/conversation.model');

const chatController = new ChatController();

const router = express.Router();

router.get(
  '/test',
  handleError(async (req, res, next) => {
    const conversation = new ModelConversation({
      members: [
        {
          _id: `0${uid(23)}`,
          userId: '65139c69f5e5b1183bc2037b',
          oke: 'ne',
          alias: 'phen',
        },
      ],
    });

    console.log('conversation:::', conversation);
    //  const conversation  = await ModelConversation.create({
    //    name:"tuan",
    //    members:[{
    //     _id : `0${uid(23)}`,
    //     userId :"65139c69f5e5b1183bc2037b",
    //     oke:"ne",
    //     alias:"phen"
    //   }]
    //  })

    //  console.log("conversation:::",conversation)

    res.json('oke');
  }),
);

router.get(
  '/conversations',
  handleError((req, res, next) => chatController.getConversations(req, res, next)),
);

router.get(
  '/message/:id',
  handleError((req, res, next) => chatController.getMessageConversation(req, res, next)),
);
// Create conversation ::: .
router.post(
  '/conversation',
  handleError((req, res, next) => chatController.createConversation(req, res, next)),
);

// Rename conversation ::: .
router.patch(
  '/rename-conversation',
  handleError((req, res, next) => chatController.renameConversation(req, res, next)),
);

// GROUP CONVERSATION:::
// -> Update leader group
router.patch(
  '/leader-conversation',
  handleError((req, res, next) => chatController.leaderConversation(req, res, next)),
);

// -> Add member for group
router.patch(
  '/add-member-conversation',
  handleError((req, res, next) => chatController.addMemberConversation(req, res, next)),
);

// -> Delete member for group
router.patch(
  '/remove-member-conversation',
  handleError((req, res, next) => chatController.removeMemberConversation(req, res, next)),
);

// -> out group
router.patch(
  '/out-conversation',
  handleError((req, res, next) => chatController.outConversation(req, res, next)),
);

// PERSONAl COVERSATION :::
// -> accept conversation  when two user are not friendship
router.patch(
  '/accept-conversation',
  handleError((req, res, next) => chatController.acceptConversation(req, res, next)),
);

// -> delete conversation
router.delete(
  '/conversation',
  handleError((req, res, next) => chatController.deleteConversation(req, res, next)),
);

// Create conversation ::: .

// router.patch("/reject-conversation", handleError((req, res, next)=>chatController.acceptConversation(req, res, next)))

module.exports = router;
