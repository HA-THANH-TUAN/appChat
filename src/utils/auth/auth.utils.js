require("dotenv").config()
const jwt=require("jsonwebtoken")

const ALIGORITHM_ACCESSTOKEN =process.env.DEV_ALIGORITHM_ACCESSTOKEN || "RS256"
const ALIGORITHM_REFRESHTOKEN =process.env.DEV_ALIGORITHM_REFRESHTOKEN || "PS256"

const TIME_EXPIRED_ACCESSTOKEN= Number(process.env.DEV_TIME_EXPIRE_ACCESSTOKEN) || 7200
const TIME_EXPIRED_REFRESHTOKEN= Number(process.env.DEV_TIME_EXPIRE_REFRESHTOKEN) || 25200


const createTokenPair=(payload, privateKey)=>{
        const accessToken=jwt.sign(payload, privateKey,{expiresIn:TIME_EXPIRED_ACCESSTOKEN,algorithm:ALIGORITHM_ACCESSTOKEN})
        const refreshToken=jwt.sign(payload, privateKey,{expiresIn:TIME_EXPIRED_REFRESHTOKEN,algorithm:ALIGORITHM_REFRESHTOKEN})
      
        return {
            accessToken,refreshToken
        }
}


const verifyTokenAccessToken = (accessToken ,publicKey )=>{
    try {
       const result=jwt.verify(accessToken, publicKey , {algorithm:[ALIGORITHM_REFRESHTOKEN]})
       if(result){
        return true
       } throw new Error()
    } catch (error) { 
        if(error.message==="invalid signature"){
            console.log("invalid !!!")
            return false
        }
        else if(error.message==="jwt expired"){
            console.log("expired !!!")
            return null
        }
        return false
}}

module.exports={createTokenPair,verifyTokenAccessToken ,TIME_EXPIRED_ACCESSTOKEN, TIME_EXPIRED_REFRESHTOKEN ,ALIGORITHM_ACCESSTOKEN,ALIGORITHM_REFRESHTOKEN}