const jwt = require("jsonwebtoken");
const client = require("../configs/redis.config");
const { BadResponse, Unauthorized } = require("../core/error.response");
const { verifyTokenAccessToken } = require("../utils/auth/auth.utils");

const verifyUser = async(req,res, next)=>{
    // middleWareCheck User
    console.log("middleWareCheck User")
    const accessToken =req.headers["authorization"].slice(7)
    const resultDecodePayload= jwt.decode(accessToken, {complete: true})?.payload; // decode get id and deviceId
    if(resultDecodePayload){
        const {id, deviceId}=resultDecodePayload
        const publicKeyFromRedis= await client.hGet(`tokens:${id}:${deviceId}`, "publicKey")
        //get publicKey verify account
        
        if(publicKeyFromRedis===null){
            // When token deleted in Redis
            throw new Unauthorized("login")
        }

        const resultverifyTokenAccessToken = verifyTokenAccessToken(accessToken, publicKeyFromRedis, {algorithm:["RS256"]})
        if(resultverifyTokenAccessToken===true){
            next();
            return null
        }
        else if(resultverifyTokenAccessToken==null){
            // Case expire token
            throw new Unauthorized("expired")
        }
        else if(resultverifyTokenAccessToken==false){
            throw new Unauthorized ()
        }
    }
    throw new BadResponse ()
  
}

module.exports =verifyUser