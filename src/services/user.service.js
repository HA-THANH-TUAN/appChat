const jwt =require("jsonwebtoken")
const UserModel= require("../models/user.model")
const { Unauthorized, BadResponse } = require("../core/error.response");

class User {
    async getUser(userId, page, limit){
        page=Number(page)
        limit=Number(limit)
        const totalUsers = await UserModel.countDocuments()
        const listUser=await UserModel.find({_id:{ $ne:userId }} ,"-password -role -message -__v").skip((page-1)*limit).limit(limit).lean()
        const totalPage = Math.ceil(((totalUsers-1)/limit))
        return {
            pagination:{
                total: totalPage,
                page:1,
                limit:limit
            },
            users:listUser
        }    
    }

    async getProfile(userId){
        const resultProfile =await UserModel.findOne({_id:userId },"-password -role -status -__v").lean()
        return resultProfile
    }
}

module.exports= new User()
