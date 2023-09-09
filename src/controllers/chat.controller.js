const { BadResponse } = require("../core/error.response")
const { OK, Created } = require("../core/sucess.response")
const {addConversation: addConversationService} =require("../services/chat.service")
const {getConversation: getConversationService} =require("../services/chat.service")
const {getMessageConversation: getMessageConversationService} =require("../services/chat.service")

class Chat {
    async addConversation (res,req, next){
        const members =res.body.members
        const userIdCreate = res.userId
        // check dupple id
        if(!Array.isArray(members) || members?.length===0){ throw new BadResponse("wrong format !")}

        const dataIdsCopy=[]
        const isDoupleId= members.some((_id)=>{
            console.log("====> ", dataIdsCopy , _id)
            if(dataIdsCopy.includes(_id) || userIdCreate===_id){
                return true
            }
            dataIdsCopy.push(_id)
            return false
        })

        if(isDoupleId){
            throw new BadResponse("cannot created conversation !")
        }

        const createObjectMember = [...members.map((_id)=>(
            {
                userId :_id,
                role: "member"   
            }
        )),{userId:userIdCreate, role: "leader"}]

       const resultService = await addConversationService(createObjectMember)

        new Created("created conversation",resultService).send(req)


    }
    async getConversation (res,req, next){
       const resultService = await getConversationService(res.userId)
        new OK("geted conversation",resultService).send(req)
    }

    async getMessageConversation (res, req, next){
        const conversationId = res.params.conversationId
        const dataService = await getMessageConversationService(conversationId)
        new OK("get conversation message success !", dataService).send(req)

    }
}
module.exports = new Chat ()