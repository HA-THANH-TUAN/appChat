const ConversationModel =require("../models/conversation..model")
const MessageModel = require("../models/message.model")
const userModel = require("../models/user.model")

class Chat {

    async addConversation(members){
        // console.log("sevice::: ",members)

        const resutlCreate= await ConversationModel.create({
            name :null,
            type: members.length===2 ? "personal" : "group",
            order: 1,
            members:  members,
        })
        return resutlCreate
    }

    
    async getConversation(userId){
        const resultCoversationsBd = await ConversationModel.find({
            members: {
              $elemMatch: { userId: userId }
            }
          }).lean()
        const listUserInConversation = resultCoversationsBd.reduce((result, {members})=>{
            const arrayIds = []
            for (const {userId} of members) {
                    const userIdString= userId.toString()
                    if(!result.includes(userIdString)){
                        arrayIds.push(userIdString)
                    } 
            }
            return [...result, ...arrayIds]
        },[])

        const resultUsers= await userModel.find({ _id:{$in:listUserInConversation}},"-password -role -__v").lean()
        const resultCoversations=resultCoversationsBd.map((conversation)=>{
            const memberHandled =  conversation.members.map(({userId, role, _id})=>{
                const user = resultUsers.find(user=>user._id.toString()===userId.toString())
                return {
                    _id,
                    role,
                    user
                }
            }) 
            return {
                ...conversation, members:memberHandled
            }
        })
        return resultCoversations 
    }
    
    async getMessageConversation(conversationId){
        const resultMessageCoversation= await MessageModel.find({ conversationId:{$eq:conversationId}}).lean()
        return resultMessageCoversation
    }

}
module.exports = new Chat()