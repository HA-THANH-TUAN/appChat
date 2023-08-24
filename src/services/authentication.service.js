const { ConflictResponse, Unauthorized, BadResponse } = require("../core/error.response");
const UserModel=require("../models/user.model")
const {hashSync, compareSync}=require('bcrypt');
const createPriPubKey = require("../utils/auth/createAsymmetricKeyPair");
const { createTokenPair, verifyTokenAccessToken } = require("../utils/auth/auth.utils");
const {uid}=require("uid")
const { addTokenRedis } = require("../models/token.redis.model");
const client = require("../configs/redis.config");
const jwt  = require("jsonwebtoken");


class Authentication {

    async signUp(data){
        const checkExistEmail =await UserModel.findOne({ email: data.email }).exec();
        const deviceId=uid(24)
        if(!checkExistEmail){
            const passwordHash = hashSync(data.password, 10)
            const resultCreate = await UserModel.create({...data, password:passwordHash})
            const {name, email , id , role}=resultCreate // data after save MongoDB.
            const tokens=await Authentication.createTokenInRedis({ id, deviceId , role})
            return {user:{name, email, id}, tokens}
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
                return {user:{name, email, id}, tokens}
            }
        }
        throw new Unauthorized()
    }
    
    async signOut(accessToken){
        const resultDecodePayload= jwt.decode(accessToken, {complete: true}).payload; // decode get id and deviceId
        if(resultDecodePayload){
            const {id, deviceId}=resultDecodePayload
            const resultDelete =await client.del(`tokens:${id}:${deviceId}`)
            if(resultDelete>0){
                return null
            }
        }
        throw new BadResponse()
    }

    async refreshToken(refreshToken){
        const resultDecodeRefreshToken= jwt.decode(refreshToken, {complete:true})
        // console.log("resultDecodeRefreshToken:::",resultDecodeRefreshToken)
        if(resultDecodeRefreshToken===null){
            throw new BadResponse()
        }
        const {id, deviceId}= resultDecodeRefreshToken.payload
        const tokensRedis= await client.hmGet(`tokens:${id}:${deviceId}`, ["refreshToken", "publicKey"])

        // console.log("tokensRedis::::",tokensRedis)
        const isCheckExist = tokensRedis.some((v)=>v===null)
        // console.log("isCheckExist::::",isCheckExist)
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
                console.log("Redis Not Update !!! ")
                throw new BadResponse()   
            }
        }
        const tokens={accessToken, refreshToken}
        return tokens
    }
}


module.exports= new Authentication()