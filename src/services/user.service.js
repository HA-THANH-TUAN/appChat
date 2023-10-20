const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const { FriendRequestModel } = require('../models/friendShip.model');

class User {
  async getUser(userId, page, limit) {
    page = Number(page);
    limit = Number(limit);
    const totalUsers = await UserModel.countDocuments();
    const listUser = await UserModel.find({ _id: { $ne: userId } }, '-password -role -message -__v')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const totalPage = Math.ceil((totalUsers - 1) / limit);
    return {
      pagination: {
        total: totalPage,
        page: 1,
        limit: limit,
      },
      users: listUser,
    };
  }

  async friendResquest(myId, yourId) {
    await UserModel.updateOne({ _id: myId }, { $push: { friend: yourId } });
  }

  async getProfile(userId, profileId) {
    const isOwn = userId === profileId;
    // const omitFieldDocument = `-password -role -status -conversationIds -__v ${userId ? "" : ""}`
    const resultProfile = await UserModel.findOne(
      { _id: profileId },
      '-password -role -status -conversationIds -__v',
    ).lean();

    if (!isOwn) {
      let relationShipStatus = 'none';
      let requestFriendId; // none || friend || sended || recivered
      const checkFriend = resultProfile.friends.some((friendId) => friendId.toString() === userId);
      if (checkFriend) {
        relationShipStatus = 'friend';
      } else {
        const requestFriend = await FriendRequestModel.findOne({
          $or: [
            { senderId: userId, receiverId: profileId },
            { receiverId: userId, senderId: profileId },
          ],
        });
        if (requestFriend) {
          const isYouSended = requestFriend.senderId.toString() === userId;
          relationShipStatus = isYouSended ? 'sended' : 'received';
          requestFriendId = requestFriend._id;
        }
      }

      resultProfile.relationShip = {
        status: relationShipStatus,
        requestFriendId: requestFriendId,
      };
      console.log('resultProfile::', resultProfile);
      return resultProfile;
    }

    console.log('resultProfile::', resultProfile);

    return resultProfile;
  }

  async getSearchUser(userId, dataBody) {
    const { text, limit, page } = dataBody;
    const textSearch = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regexSearch = new RegExp(textSearch(text), 'i');
    const totalDoc = await UserModel.countDocuments({ name: regexSearch });
    console.log('totalDoc:::', totalDoc);
    const resultSearchData = await UserModel.find({ name: regexSearch })
      .skip(limit * (page - 1))
      .limit(limit);
    const total = Math.ceil(totalDoc / limit);
    const resultSearch = resultSearchData;
    const resultService = {
      users: resultSearch,
      papigation: {
        page: page,
        limit: limit,
        total: total,
      },
    };
    return resultService;
  }
}

module.exports = new User();
