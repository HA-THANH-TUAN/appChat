const jwt = require('jsonwebtoken');
const { ConversationModel } = require('../../models/conversation.model');
const client = require('../../models/redis.model');
const MessageModel = require('../../models/message.model');
const { uid } = require('uid');
const UserModel = require('../../models/user.model');
const { typeCheck } = require('type-check');
const optionTypeCustom = require('../../utils/checkType');
const { BadResponse } = require('../../core/error.response');
const mongoose = require('mongoose');
const handleMessageEvent = require('../../utils/socket/messageEvent');

const algorithmRefreshToken = process.env.DEV_ALIGORITHM_REFRESHTOKEN;

let socketIO;

const serviceSocketOI = (io) => {
  io.use(async (socket, next) => {
    socket.id = undefined;

    try {
      const access_token = socket.handshake.auth.access_token;

      if (!access_token) {
      }
      const resultDecode = jwt.decode(access_token);

      const publickey = await client.hGet(`tokens:${resultDecode.id}:${resultDecode.deviceId}`, 'publicKey');

      if (publickey === null) {
        console.log('error io not find public==>');
      }

      const resultVerify = jwt.verify(access_token, publickey, { algorithms: ['PS256'] });

      const session = uid(20);
      socket.userId = `${resultVerify.id}`;
      socket.id = `${resultVerify.id}/${resultVerify.deviceId}/${session}`;
      next();
      console.log('next==>');
    } catch (error) {
      console.log('error io catch==>', error);
      // next(new Error("error auth !"))
    }
  });

  io.on('connection', async (socket) => {
    socketIO = socket;
    // console.log("connection nha !!! " ,socket.id)
    // if(socket.id){
    //   // Add conversation ..... start
    //   const resultCoversationsBd = await ConversationModel.find({
    //     members: {
    //         $elemMatch: { _id: socket.userId }
    //       }
    //     },"-__v -name -order -statusConversation -type -members").lean()
    //     const listRoomId = resultCoversationsBd.map((conversation)=>(conversation._id.toString()))
    //     console.log("Số lượng cuộc trò chuyện:::",listRoomId.length    )
    //     listRoomId.forEach(roomId => {
    //       socket.join(roomId)
    //       // socket.to(roomId).emit("active", socket.id)
    //     });
    //     io.to(socket.id).emit("connected","OK")
    // }
    socket.on('requestCall', async ({ peerId, roomId }) => {
      if (peerId) {
        const socketIdItsSelf = socket.id.split('/')[0];
        const roomsKey = io.sockets.adapter.rooms.get(roomId).keys();
        for (const iterator of roomsKey) {
          if (!iterator.includes(socketIdItsSelf)) {
            console.log('iterator:::', iterator);
            socket.to(iterator).emit('requestCall', {
              peerId: peerId,
              roomId: roomId,
              socketCaller: socket.id,
            });
          }
        }
      }
    });

    socket.on('online', async (data) => {
      const listSocketKeys = Array.from(io.sockets.adapter.rooms.keys());
      const userId = socket.id.split('/')[0];

      // console.log("------tao online day------", userId)

      // const isHasDeviceOnline = listSocketKeys.some((key)=>key.includes(userId))
      // console.log("isHasDeviceOnline:::",isHasDeviceOnline)
      if (true) {
        await UserModel.updateOne({ _id: userId }, { $set: { status: 'active' } });
        const resultCoversationsBd = await ConversationModel.find(
          {
            members: {
              $elemMatch: { userId: userId },
            },
          },
          '-__v -name -order -statusConversation -type ',
        ).lean();

        const listConversation = resultCoversationsBd.reduce((listUserId, conversation) => {
          conversation.members.forEach((member) => {
            const userId = member.userId.toString();
            if (!listUserId.includes(userId)) {
              listUserId.push(userId);
            }
          });
          return listUserId;
        }, []);

        listSocketKeys.forEach((socketId) => {
          const userIdFriend = socketId.split('/')[0];
          const isEmit = listConversation.includes(userIdFriend);
          if (isEmit) {
            socket.to(socketId).emit('status', {
              userId: userId,
              status: 'active',
            });
          }
        });
      }

      // try {

      //   const userId = socket.id.split("/")[0]
      //   await UserModel.updateOne({ _id:userId }, { $set: { status: 'active' } })
      //   const resultCoversationsBd = await conversationModel.find({
      //     members: {
      //         $elemMatch: { userId: userId }
      //       }
      //     },"-__v -name -order -statusConversation -type ").lean()

      //   // console.log("====resultCoversationsBd====",resultCoversationsBd)

      //   const listConversation= resultCoversationsBd.reduce((listUserId, conversation)=>{
      //     conversation.members.forEach((member)=>{
      //       const userId =member.userId.toString()
      //       if(!listUserId.includes(userId)){
      //         listUserId.push(userId)
      //       }
      //     })
      //     return listUserId
      //   },[])
      //   const listSocketKeys =io.sockets.adapter.rooms.keys()
      //   // console.log("==listSocketKeys===", listSocketKeys)

      //   Array.from(listSocketKeys).forEach((socketId)=>{
      //     const userId = socketId.split("/")[0]
      //     if( !socket.id.includes(userId) && listConversation.includes(userId)){
      //       socket.to(socketId).emit("status", {
      //         userId:userId,
      //         status:"active"
      //       })
      //     }
      //   })

      // } catch (error) {
      //   console.log(">>>>",error)
      // }
    });

    socket.on('acceptCalling', async () => {
      console.log('acceptCalling socketID', socket.id);
    });

    socket.on('rejectCalling', async ({ roomId, socketCaller }) => {
      console.log('rejectCalling', socket.id);
      io.to(socketCaller).emit('rejectCalling');
    });

    socket.on('message', async (data) => {
      console.log('Into Messsage Event !');
      await handleMessageEvent(io, socket, data);
    });

    socket.on('disconnect', async () => {
      const listSocketKeys = Array.from(io.sockets.adapter.rooms.keys());
      const userId = socket.id.split('/')[0];

      console.log('------tao out day------', userId);

      const isHasDeviceOnline = listSocketKeys.some((key) => key.includes(userId));
      if (!isHasDeviceOnline) {
        await UserModel.updateOne({ _id: userId }, { $set: { status: 'inactive' } });
        const resultCoversationsBd = await ConversationModel.find(
          {
            members: {
              $elemMatch: { userId: userId },
            },
          },
          '-__v -name -order -statusConversation -type ',
        ).lean();

        const listConversation = resultCoversationsBd.reduce((listUserId, conversation) => {
          conversation.members.forEach((member) => {
            const userId = member.userId.toString();
            if (!listUserId.includes(userId)) {
              listUserId.push(userId);
            }
          });
          return listUserId;
        }, []);

        listSocketKeys.forEach((socketId) => {
          const userIdFriend = socketId.split('/')[0];
          const isEmit = listConversation.includes(userIdFriend);
          if (isEmit) {
            socket.to(socketId).emit('status', {
              userId: userId,
              status: 'inactive',
            });
          }
        });
      }
    });
  });
};

module.exports = { socketIO };

module.exports = serviceSocketOI;
