const mongoose = require('mongoose');
const { BadResponse } = require('../core/error.response');
const { ConversationModel } = require('../models/conversation.model');
const MessageModel = require('../models/message.model');
const UserModel = require('../models/user.model');
const { uid } = require('uid');
const { ObjectId } = require('mongodb');

class Chat {
  static async checkFriended(userId, members) {
    console.log(members);
    const isFriended = await UserModel.exists({ _id: userId, friendIds: { $all: members } });

    if (isFriended) return true;
    return false;
  }
  static async checkUser(members) {
    console.log(members);
    const query = [];
    members.forEach((userId) => {
      query.push({ _id: userId });
    });
    const numberUser = await UserModel.countDocuments({ $or: query });
    if (numberUser === members.length) return true;
    return false;
  }

  static createMemberList(creator, allMembers, type) {
    const memberList = allMembers.reduce((memberList, userId) => {
      const object = {
        _id: userId,
        alias: '',
        role: userId === creator ? 'leader' : 'member',
      };
      return [...memberList, object];
    }, []);
    return memberList;
  }

  static async createDocumentConversation(memberList, session) {
    const objectDocument = {
      _id: `1${uid(23)}`,
      name: '',
      type: 'group',
      order: 1,
      members: memberList,
    };

    const conversationDoc = new ConversationModel(objectDocument);
    console.log(conversationDoc);
    await conversationDoc.save({ session });
    return conversationDoc._id;
  }

  static async addConversationForUser(idConversation, allMembers, session) {
    await UserModel.updateMany(
      { _id: { $in: allMembers } },
      { $addToSet: { conversationIds: idConversation } },
      { session },
    );
  }

  static async transactionCreateConversation(userId, members) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const allMembers = [...members, userId];

      const membersList = this.createMemberList(userId, allMembers);

      const idConversation = await this.createDocumentConversation(membersList, session);

      await this.addConversationForUser(idConversation, allMembers, session);

      await session.commitTransaction();
    } catch (error) {
      console.log('transactionCreateConversation:::', error);
      await session.abortTransaction();
      throw new BadResponse("Can't create conversation");
    } finally {
      await session.endSession();
    }
  }

  async createConversationGroup(userId, members) {
    const isFriended = await Chat.checkFriended(userId, members);
    const isAllUser = await Chat.checkUser(members);
    const l = members?.length;

    if (!isFriended || !isAllUser || l < 2) throw new BadResponse('failure');

    await Chat.transactionCreateConversation(userId, members);
    return 'Temporary oke';
  }

  async renameConversation(userId, name, conversationId) {
    await ConversationModel.updateOne({ _id: conversationId }, { name: name });
  }
  async leaderConversation(userId, leaderId, conversationId) {
    const conversation = await ConversationModel.findOne({
      _id: conversationId,
      members: { $elemMatch: { _id: userId, role: 'leader' } },
    }).lean();
    if (conversation === null) {
      throw new BadResponse('You must not leader');
    }

    console.log('conversation:::', conversation);
    const members = conversation.members;
    const leaderIsMembers = members.some((member) => leaderId === member._id.toString());
    console.log('leaderIsMembers:::', leaderIsMembers);

    if (!leaderIsMembers) {
      throw new BadResponse('leader is not members');
    }

    const newMembers = members.map((item) => ({
      _id: item._id,
      alias: item.alias,
      role: item._id.toString() === leaderId ? 'leader' : 'member',
    }));

    await ConversationModel.updateOne({ _id: conversationId }, { members: newMembers });
  }

  async addMemberConversation() {}

  async outConversation(userId, conversationId) {
    console.log({ userId, conversationId });
    const conversation = await ConversationModel.findOne({
      _id: conversationId,
      members: { $elemMatch: { _id: new ObjectId(userId) } },
    }).lean();

    if (!conversation) {
      throw new BadResponse('not find your conversation');
    }
    const members = conversation.members;

    const lMember = members.length;

    const isLeader = members.some((member) => member._id.toString() === userId);

    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { conversationIds: { $eq: new ObjectId(conversationId) } } },
        { session, new: true },
      );

      await ConversationModel.updateOne(
        { _id: conversationId },
        { $pull: { members: { _id: new ObjectId(userId) } } },
        { session, new: true },
      );

      if (isLeader) {
        if (lMember < 2) {
          await ConversationModel.deleteOne({ _id: conversationId }, { session, new: true });
        } else {
          await ConversationModel.updateOne(
            { _id: conversationId },
            { members: { _id: new ObjectId(userId) } },
            { session, new: true },
          );
        }
      }
      await session.commitTransaction();
    } catch (error) {
      console.log('eoror:::', error);
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }

  async getConversations(userId, page, limit) {
    // const dataConversation = await UserModel.aggregate([
    //     // {
    //     //     $unwind: '$conversationIds', // Deconstruct the authorId array
    //     // },
    //     {
    //       $lookup: {
    //         from: 'Conversations',
    //         localField: 'conversationIds',
    //         foreignField: '_id',
    //         as: 'conversation',
    //       },
    //     },
    // ])
    // const total= dataConversation.conversation?.conversationId.length

    // return dataConversation
    // const a= await UserModel.updateMany({}, { $rename: { "friendRequestIds": 'friendRequests',"friendIds":"friends" } })
    // console.log(a)

    const dataConversation = await UserModel.findById({ _id: userId }, '-password -role -__v -friendRequests -friends')
      .populate([
        {
          path: 'conversations',
          populate: [
            {
              path: 'members._id',
              select: 'name _id email status',
            },
            {
              path: 'lastMessage',
              populate: [{ path: 'sender', select: 'name _id' }],
            },
          ],
        },
      ])
      .lean();
    return dataConversation;
  }

  async getMessageConversation(userId, id) {
    console.log({ userId, id });
    if (id[0] === '1') {
      // group
    } else {
      const resultService = {};
      const conversationOfId = await ConversationModel.findOne({
        members: { $all: [{ $elemMatch: { _id: id } }, { $elemMatch: { _id: userId } }] },
      });
      const members = await UserModel.find({ $or: [{ _id: userId }, { _id: id }] }, '_id name status').lean();
      if (members === null || members.length === 1) {
        throw new BadResponse('not find user');
      }
      resultService.members = members;
      resultService.type = 'personal';
      console.log('conversationOfId::::', conversationOfId);
      if (conversationOfId === null) {
        resultService.conversationId = null;
        resultService.messages = [];
        console.log('oke:::', resultService);
        return resultService;
      }

      const conversationId = conversationOfId._id;
      console.log('conversationId::::', conversationId);
      const messageConversation = await MessageModel.find({ conversation: conversationId });
      resultService.conversationId = conversationId;
      resultService.messages = messageConversation ? messageConversation : [];
      return resultService;
    }
  }
}
module.exports = Chat;
