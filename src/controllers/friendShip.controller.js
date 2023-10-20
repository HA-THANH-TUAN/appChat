const { BadResponse } = require('../core/error.response');
const { OK } = require('../core/sucess.response');
const FriendShipService = require('../services/friendShip.service');

class FriendShip {
  constructor() {
    this.service = new FriendShipService();
  }

  async requestFriend(req, res) {
    const userId = req.userId;
    const receiverId = req.body.receiverId;
    const isCheckReceiverId = typeof receiverId == 'string' && receiverId.length > 0;
    if (!isCheckReceiverId) {
      throw new BadResponse();
    }
    if (receiverId === userId) {
      throw new BadResponse('not request friend for yourself');
    }
    const resultService = await this.service.requestFriend(userId, receiverId);
    new OK('successfull sended', resultService).send(res);
  }

  async deleteRequestFriend(req, res) {
    const userId = req.userId;
    const requestFriendId = req.body.requestFriendId;
    const isRequestFriendId = typeof requestFriendId === 'string' && requestFriendId.length > 0;
    if (!isRequestFriendId) {
      new BadResponse();
    }

    await this.service.deleteRequestFriend(userId, requestFriendId);
    new OK('successful deleted').send(res);
  }

  async unfriend(req, res) {
    const userId = req.userId;
    const friendId = req.body.friendId;
    if (userId === friendId) {
      throw new BadResponse();
    }
    const resultService = this.service.unfriend(userId, friendId);
    new OK('successfull unfriend').send(res);
  }

  async acceptRequestFriend(req, res) {
    const rooms = req.IO.sockets.adapter.rooms;
    const requestFriendId = req.body.requestFriendId;
    const userId = req.userId;

    const IO = req.IO;

    const resultService = await this.service.acceptRequestFriend(userId, requestFriendId);

    // IO.emit("status", "oke")

    new OK('successfull addfriend').send(res);
  }

  async rejectRequestFriend(req, res) {
    // const rooms = req.IO.sockets.adapter.rooms
    const requestFriendId = req.body.requestFriendId;
    const userId = req.userId;

    if (!requestFriendId) {
      throw new BadResponse('Not found');
    }

    await this.service.rejectRequestFriend(userId, requestFriendId);
    new OK('successfull reject request friend').send(res);
  }
}

module.exports = FriendShip;
