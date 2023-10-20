const { BadResponse } = require('../core/error.response');
const { FriendRequestModel } = require('../models/friendShip.model');
const { ConversationModel } = require('../models/conversation.model');
const UserModel = require('../models/user.model');
const mongoose = require('mongoose');
const { uid } = require('uid');
class FriendShip {
  static async checkExistFriend(senderId, receiverId) {
    if (senderId === receiverId) throw new BadResponse('Both is one !');
    const checkExistUser = await Promise.all([
      UserModel.findOne({ _id: receiverId }).lean(),
      UserModel.findOne({ _id: senderId }).lean(),
    ]);
    // check friended.....
    const checkFriendedSender = checkExistUser[0]?.friendIds?.some((ojbId) => ojbId.toString() === senderId);
    const checkFriendedReceiver = checkExistUser[1]?.friendIds?.some((ojbId) => ojbId.toString() === receiverId);

    console.log('checkFriendedReceiver || checkFriendedSender:::', checkFriendedReceiver || checkFriendedSender);
    if (checkFriendedReceiver || checkFriendedSender) throw new BadResponse('Receiver was your friend !');
  }

  static async transactionAcceptRequestFriend(requestFriendId, userId, senderId) {
    console.log({
      userId,
      senderId,
    });
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      await FriendRequestModel.deleteOne(
        {
          _id: requestFriendId,
        },
        { session },
      );

      await FriendShip.checkExistFriend(userId, senderId);

      const resultCoversation = await ConversationModel.findOne({
        members: { $elemMatch: { _id: [userId, senderId] } },
      }).lean();

      let conversationId;

      if (!resultCoversation) {
        const conversationDoc = new ConversationModel({
          _id: `0${uid(23)}`,
          type: 'personal',
          statusConversation: 'accepted',
          members: [
            {
              _id: userId,
              alias: '',
            },
            {
              _id: senderId,
              alias: '',
            },
          ],
        });
        conversationId = conversationDoc._id;
        await conversationDoc.save({ session });
      }

      await UserModel.updateOne(
        { _id: userId },
        {
          $addToSet: { conversations: conversationId, friendIds: senderId },
          $pull: { friendRequestIds: requestFriendId },
        },
        { session, new: true },
      );

      await UserModel.updateOne(
        { _id: senderId },
        {
          $addToSet: { conversations: conversationId, friendIds: userId },
          $pull: { friendRequestIds: requestFriendId },
        },
        { session, new: true },
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      console.log('acceptRequestFriend transaction', error);
      throw new BadResponse("Can't accept request friend !");
    } finally {
      session.endSession();
    }
  }

  static async transactionRequestFriend(senderId, receiverId) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const resultCreateRequestFriend = new FriendRequestModel({
        senderId,
        receiverId,
      });
      await resultCreateRequestFriend.save({ session });
      const requestFriendId = resultCreateRequestFriend._id;
      await UserModel.updateMany(
        { $or: [{ _id: receiverId }, { _id: senderId }] },
        { $addToSet: { friendRequestIds: requestFriendId } },
        { session, new: true },
      );
      const select = '-password -role -__v -createAt -updateAt -status -friendIds -friendRequestIds -conversationIds';
      const data = (
        await resultCreateRequestFriend.populate([
          {
            path: 'senderId',
            select: select,
          },
          {
            path: 'receiverId',
            select: select,
          },
        ])
      )._doc;

      await session.commitTransaction();
      const { senderId: s, receiverId: r } = data;
      delete data['senderId'];
      delete data['receiverId'];
      data.sender = s;
      data.receiver = r;
      return data;
    } catch (error) {
      await session.abortTransaction();
      console.log('post request friend error', error);
      throw new BadResponse("Can't request friend");
    } finally {
      session.endSession();
    }
  }

  static async transactionDeleteRequestFriend(requestFriendId, senderId, receiverId) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const resultModel = await FriendRequestModel.deleteOne({ _id: requestFriendId }, { session });
      const a = await UserModel.updateMany(
        { $or: [{ _id: senderId }, { _id: receiverId }] },
        { $pull: { friendRequestIds: requestFriendId } },
        { session, new: true },
      );
      console.log({ a, resultModel });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      console.log('transactionDeleteRequestFriend:::', error);
      throw new BadResponse("Can't destroy your request friend !");
    } finally {
      session.endSession();
    }
  }

  async requestFriend(userId, receiverId) {
    if (userId === receiverId) throw new BadResponse("Can't request friend with youself ! ");
    // check friended.....
    await FriendShip.checkExistFriend(userId, receiverId);
    // check exist request friend before.....
    const checkRequestFriend = await FriendRequestModel.findOne({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { receiverId: userId, senderId: receiverId },
      ],
    }).lean();

    if (checkRequestFriend) throw new BadResponse('Exist a request friend between both !');
    const dataResponse = await FriendShip.transactionRequestFriend(userId, receiverId);
    return dataResponse;
  }

  async deleteRequestFriend(userId, requestFriendId) {
    console.log({
      userId,
      requestFriendId,
    });
    const checkExistRequest = await FriendRequestModel.findById({ _id: requestFriendId });

    console.log('checkExistRequest:::', checkExistRequest);
    if (!checkExistRequest) {
      throw new BadResponse("Request friend doesn't exist !");
    }

    const senderId = checkExistRequest.senderId.toString();
    if (!senderId === userId) {
      throw new BadResponse('Request friend must be sent by you ');
    }

    const receiverId = checkExistRequest.receiverId.toString();

    await FriendShip.transactionDeleteRequestFriend(requestFriendId, userId, receiverId);
  }

  async rejectRequestFriend(userId, requestFriendId) {
    const checkExistRequest = await FriendRequestModel.findById({ _id: requestFriendId });

    if (!checkExistRequest) {
      throw new BadResponse("Request friend doesn't exist !");
    }

    const receiverId = checkExistRequest.receiverId.toString();

    if (!receiverId === userId) {
      throw new BadResponse('Request friend must be received by you ');
    }

    const senderId = checkExistRequest.senderId.toString();
    await FriendShip.transactionDeleteRequestFriend(requestFriendId, userId, senderId);
  }

  async acceptRequestFriend(userId, requestFriendId) {
    const requestFriend = await FriendRequestModel.findOne({
      _id: requestFriendId,
      receiverId: userId,
    });

    if (!requestFriend) throw new BadResponse('Request friend does not exist');
    const senderRequestId = requestFriend.senderId.toString();
    await FriendShip.transactionAcceptRequestFriend(requestFriendId, userId, senderRequestId);
  }

  async unfriend(userId, friendId) {
    console.log({
      userId,
      friendId,
    });
    const checkExistFriend = await UserModel.count({
      $or: [
        { _id: userId, friendIds: friendId },
        { _id: friendId, friendIds: userId },
      ],
    });

    if (!(checkExistFriend === 2)) {
      throw new BadResponse('Yet friend !');
    }
    async function transactionUnfriend(userId, friendId) {
      const session = await mongoose.startSession();

      try {
        session.startTransaction();
        const containRemoveUserId = [userId, friendId];

        await UserModel.updateMany(
          { $or: [{ _id: userId }, { _id: friendId }] },
          { $pull: { friendIds: { $in: containRemoveUserId } } },
          { session, new: true },
        );

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        console.log('transactionUnfriend', error);
        throw new BadResponse("Can't unfriend");
      } finally {
        session.endSession();
      }
    }
    await transactionUnfriend(userId, friendId);
  }
}

module.exports = FriendShip;
