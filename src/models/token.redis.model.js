const client =require("../models/redis.model")
const { timeExpiredRefreshToken} = require("../utils/auth/auth.utils")

const addTokenRedis = async (name, { refreshToken , publicKey})=>{
    const fieldsAdded = await client.hSet(
        name,
        {
            refreshToken,
            publicKey
        },
    )
    const resultSetTime =  await client.expire(name, timeExpiredRefreshToken)
    return fieldsAdded
}

module.exports={addTokenRedis}