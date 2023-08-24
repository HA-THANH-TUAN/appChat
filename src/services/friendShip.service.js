const { BadResponse } = require("../core/error.response")
const { FriendRequestModel } = require("../models/friend.model")

class FriendShip {
    async addFriend(id, friendId){
        const checkExist = await FriendRequestModel.findOne({senderId:friendId, receiverId:id }).lean()
        if(!checkExist){
            const resultCreateRequest = await FriendRequestModel.create({senderId: id, receiverId:friendId})
            return resultCreateRequest
        }throw new BadResponse()
    }
}

module.exports =new FriendShip()