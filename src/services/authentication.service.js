const { ConflictResponse, Unauthorized, BadResponse } = require("../core/error.response");
const UserModel=require("../models/user.model")
const {hashSync, compareSync}=require('bcrypt');
const createPriPubKey = require("../utils/auth/createAsymmetricKeyPair");
const { createTokenPair, verifyTokenAccessToken } = require("../utils/auth/auth.utils");
const {uid}=require("uid")
const { addTokenRedis } = require("../models/token.redis.model");
const client = require("../models/redis.model");
const jwt  = require("jsonwebtoken");


class Authentication {
    
 
    async signUp(data,res){
        const checkExistEmail =await UserModel.findOne({ email: data.email }).exec();
        const deviceId=uid(24)
        if(!checkExistEmail){
            const passwordHash = hashSync(data.password, 10)
            const resultCreate = await UserModel.create({...data, password:passwordHash})
            const {name, email , id , role}=resultCreate // data after save MongoDB.
            const tokens=await Authentication.createTokenInRedis({ id, deviceId , role})
            res.cookie('access_token', tokens.accessToken, { httpOnly: true });
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            return {user:{name, email, id:id}, tokens}
        }
        throw new ConflictResponse()   
    }
    
    async signIn(data){
        const userFromDatabase= await UserModel.findOne({email: data.email}).exec();
        if(userFromDatabase){
            const deviceId=uid(24)
            const isCheckPassword =compareSync(data.password , userFromDatabase.password)
            if(isCheckPassword){
                const {name, email , id ,role}=userFromDatabase // data get from MongoDB.
                const tokens =await Authentication.createTokenInRedis({id, deviceId ,role})
                console.log("Have user login !!! ")
                return {user:{name, email, id}, tokens}
            }
        }
        throw new Unauthorized()
    }
    
    async signOut(accessToken){
        const resultDecodePayload= jwt.decode(accessToken, {complete: true}).payload; // decode get id and deviceId
        if(resultDecodePayload){
            console.log(">>>>> chuan bi decode")
            const {id, deviceId}=resultDecodePayload
            const resultDelete =await client.del(`tokens:${id}:${deviceId}`)
            if(resultDelete>0){
                return null
            }
            console.log(">>>>>  decode")
        }
        throw new BadResponse()
    }

    async refreshToken(refreshToken){
        const resultDecodeRefreshToken= jwt.decode(refreshToken, {complete:true})
        if(resultDecodeRefreshToken===null){
            throw new BadResponse()
        }
        const {id, deviceId}= resultDecodeRefreshToken.payload
        const tokensRedis= await client.hmGet(`tokens:${id}:${deviceId}`, ["refreshToken", "publicKey"])
        const isCheckExist = tokensRedis.some((v)=>v===null)
        if(isCheckExist){
            throw new BadResponse()
        }    
        
        try {
            const resultVerifyRefreshToken= jwt.verify(refreshToken,tokensRedis[1])
            if(resultVerifyRefreshToken){
                const {id, deviceId, role}= resultVerifyRefreshToken
                const tokens=await Authentication.createTokenInRedis({id, deviceId, role}, true)
                return {tokens}
            }
        } catch (error) {
            throw new BadResponse()
        }



    }

    static createTokenInRedis =async ({ id,deviceId ,role}, isRefreshToken)=>{
        const {privateKey, publicKey}= createPriPubKey()
        const {accessToken, refreshToken} = createTokenPair({id, deviceId, role}, privateKey)
        // publicKey and refreshToken save RedisStore.
        const dtRedis={publicKey, refreshToken}
        const numberField =Object.keys(dtRedis).length
        const resultRedis = await addTokenRedis(`tokens:${id}:${deviceId}`,dtRedis)
        if(isRefreshToken===undefined || isRefreshToken===false){
            if(resultRedis!==numberField){
                //Error save redis
                throw new BadResponse()   
            }
        }
        const tokens={accessToken, refreshToken}
        return tokens
    }
}


module.exports= new Authentication()