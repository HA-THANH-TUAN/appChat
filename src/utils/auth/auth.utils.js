const jwt=require("jsonwebtoken")
const algorithm="RS256"
const timeExpiredAccessToken= 60*2
const timeExpiredRefreshToken=60*4

const createTokenPair=(payload, privateKey)=>{
        const accessToken=jwt.sign(payload, privateKey,{expiresIn:timeExpiredAccessToken,algorithm})
        const refreshToken=jwt.sign(payload, privateKey,{expiresIn:timeExpiredRefreshToken,algorithm:"PS256"})
      
        return {
            accessToken,refreshToken
        }
}


const verifyTokenAccessToken = (accessToken ,publicKey )=>{
    try {
       const result=jwt.verify(accessToken, publicKey , {algorithm:["RS256"]})
       console.log("result:::",result)
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

module.exports={createTokenPair,verifyTokenAccessToken ,timeExpiredAccessToken, timeExpiredRefreshToken}