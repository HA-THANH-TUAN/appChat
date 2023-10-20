const { typeCheck } = require('type-check');
const { BadResponse } = require('../../core/error.response');
const { ConversationModel } = require('../../models/conversation.model');
const MessageModel = require('../../models/message.model');
const UserModel = require('../../models/user.model');
const optionTypeCustom = require('../checkType');
const { default: mongoose } = require('mongoose');
const { uid } = require('uid');

const transactionSendMessageWithNotConversation = async (dtConversation, dtMessage, senderId, receiverId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const docConversaion = new ConversationModel(dtConversation);
    const resultCreateConversation = await docConversaion.save({ session, new: true });
    const docMessage = new MessageModel(dtMessage);
    const resultCreateMessage = await docMessage.save({ session, new: true });
    const resultUpdateUserR = await UserModel.updateOne(
      { _id: receiverId },
      { $addToSet: { conversations: new mongoose.Types.ObjectId(dtConversation._id) } },
      { session, new: true },
    );
    const resultUpdateUserS = await UserModel.updateOne(
      { _id: senderId },
      { $addToSet: { conversations: new mongoose.Types.ObjectId(dtConversation._id) } },
      { session, new: true },
    );
    await session.commitTransaction();
    return { resultCreateConversation, resultCreateMessage, resultUpdateUserR, resultUpdateUserS };
  } catch (error) {
    await session.abortTransaction();
    console.log('transactionSendMessageWithNotConversation:::', error);
    throw new BadResponse('error ::: transactionSendMessageWithNotConversation');
  } finally {
    await session.endSession();
  }
};

const transactionSendMessageWithHaveConversation = async (dtMessage) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const docMessage = new MessageModel(dtMessage);
    await docMessage.save({ session });
    await ConversationModel.updateOne(
      { _id: dtMessage.conversation },
      { lastMessage: new mongoose.Types.ObjectId(dtMessage._id) },
      { session, new: true },
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.log('transactionSendMessageWithHaveConversation:::', error);
    throw new BadResponse('error ::: transactionSendMessageWithHaveConversation');
  } finally {
    await session.endSession();
  }
};

const handleMessageGroup = async () => {};

const handleHadMessageConversation = async (conversationId, senderId, data, ischeckYetAccept) => {
  const dtMessage = {
    _id: data._id,
    conversation: conversationId,
    peopleWacthed: [{ _id: senderId }],
    sender: senderId,
    message: {
      content: data.message,
    },
  };
  console.log('chua chap nhan::', ischeckYetAccept);
  if (ischeckYetAccept) {
    await ConversationModel.findOneAndUpdate(
      {
        _id: conversationId,
        'members._id': senderId,
      },
      {
        $set: { 'members.$.status': 'accepted' },
      },
      { new: true },
    );
  }
  await transactionSendMessageWithHaveConversation(dtMessage);
};

const handleYetMessageConversation = async (senderId, data) => {
  const conversationId = `0${uid(23)}`;
  const dtConversation = {
    _id: conversationId,
    type: 'personal',
    lastMessage: data._id,

    members: [
      {
        _id: senderId,
        alias: '',
        status: 'accepted',
      },
      {
        _id: data.receiverId,
        alias: '',
        status: 'pending',
      },
    ],
  };

  const dtMessage = {
    id: data._id,
    conversation: conversationId,
    peopleWacthed: [{ _id: senderId }],
    sender: senderId,
    message: {
      content: data.message,
    },
  };

  await transactionSendMessageWithNotConversation(dtConversation, dtMessage, senderId, data.receiverId);
  return conversationId;
};

// const handleSendSocketRelatedUser = (io,socketIdClient, socketUserId ,receiverId,data) => {
//   const keySocketRooms = io.sockets.adapter.rooms.keys();
//   for (const socketId of keySocketRooms) {
//     const isDeviceOrthersOfUser = socketId.includes(`${socketUserId}/`);
//     const isDeviceOrthersOfReceiver = socketId.includes(`${receiverId}/`);
//     if (socketId !== socketIdClient && (isDeviceOrthersOfReceiver || isDeviceOrthersOfUser)) {
//       io.to(socketId).emit('receiveMessage', data);
//     }
//   }
// };

const handleMessagePersonal = async (io, socket, data) => {
  const receiverId = data.receiverId;
  const senderId = socket.userId;
  const conversation = await ConversationModel.findOne({
    members: { $all: [{ $elemMatch: { _id: senderId } }, { $elemMatch: { _id: receiverId } }] },
    type: 'personal',
  }).lean();

  let conversationId = conversation ? conversation._id : null;

  if (conversation) {
    const ischeckYetAccept = conversation.members.some(
      (mem) => mem._id.toString() === senderId && mem.status === 'pending',
    );
    await handleHadMessageConversation(conversationId, senderId, data, ischeckYetAccept);
  } else {
    const isUserExist = await UserModel.countDocuments({ _id: data.receiverId });
    if (isUserExist !== 1) {
      throw new Error('error conversation');
    }
    conversationId = await handleYetMessageConversation(senderId, data);
  }

  const conversationNew = await ConversationModel.findById({ _id: conversationId })
    .populate([
      {
        path: 'members._id',
        select: 'name _id email status',
      },
      {
        path: 'lastMessage',
        populate: [{ path: 'sender', select: 'name _id' }],
      },
    ])
    .lean();
  const messageNew = await MessageModel.findById({ _id: data._id }).lean();
  messageNew.receiverId = receiverId;

  const dataSendClient = {
    data: { message: messageNew, receiverId: receiverId, conversation: conversationNew, conversationType: 'personal' },
  };

  const keySocketRooms = io.sockets.adapter.rooms.keys();

  for (const socketId of keySocketRooms) {
    const isDeviceOrthersOfUser = socketId.includes(`${senderId}/`);
    const isDeviceOrthersOfReceiver = socketId.includes(`${receiverId}/`);
    if (isDeviceOrthersOfReceiver || isDeviceOrthersOfUser) {
      io.to(socketId).emit('receiveMessage', dataSendClient);
    }
  }
};

const handleMessageEvent = async (io, socket, data) => {
  console.log('data from client :::', data);
  try {
    const checkData = typeCheck(
      `{conversationId:idCheck| Null,user:{id:idCheck,name:String},receiverId:idCheck,message:String,_id:idCheck}`,
      data,
      optionTypeCustom.idCheck,
    );
    if (!checkData) throw new Error('error form message !');
    const conversationId = data.conversationId;

    const isPersonal = conversationId === null || conversationId?.[0] === '0';

    console.log('isPersonal:::', isPersonal);
    if (isPersonal) {
      await handleMessagePersonal(io, socket, data);
    } else {
      await handleMessageGroup();
    }
  } catch (error) {
    console.log('error message event :::', error);
    socket.emit('messageError', {
      data,
    });
  }
};

module.exports = handleMessageEvent;
