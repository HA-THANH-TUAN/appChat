const { OK } = require("../core/sucess.response")
const {addFriend: addFriendService}=require("../services/friendShip.service")

class FriendShip {
    async addFriend(req,res, next){
        // const verifyToken=
        const query= req.query
        
        const result = await addFriendService(query.id, query.friendId)
        new OK(undefined, result).send(res)
    }
}

module.exports= new FriendShip()