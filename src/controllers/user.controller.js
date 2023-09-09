const { BadResponse } = require("../core/error.response")
const { OK } = require("../core/sucess.response")
const {getUser: getUserService}=require("../services/user.service")
const {getProfile :getProfileService } = require("../services/user.service")

class User {
    async getUser(req, res){
            const userId=req.query?.userId
            const page=req.query?.page
            const limit=req.query?.limit
            if(userId){
                const resultService =await getUserService(userId,page ,limit )
                new OK(undefined,resultService).send(res)
                return null
            }
            new BadResponse()
    }

    async getProfile (req, res){
        const {userId} = req.params
        const resultService= await getProfileService(userId)
        new OK(undefined,resultService ).send(res)
    }

}

module.exports =new User()