const { BadResponse } = require("../core/error.response")
const { Created, OK } = require("../core/sucess.response")

const { signUp : signUpService, signIn: signInService, signOut: signOutService , refreshToken: refreshTokenService } = require("../services/authentication.service")
class Authentication {

   async signUp(req, res){
      const resultService= await signUpService(req.body,res)
   
      new Created("signup success", resultService).send(res)
   }

   async signIn(req, res){
      const resultService =await signInService(req.body)
      new OK("signin success",resultService ).send(res)
   }

   async signOut(req, res){
      const acessToken =req.headers["authorization"].slice(7)
      const result = await signOutService(acessToken)
      new OK("logout success", result).send(res)
      
   }
   
   async refreshToken (req, res){
      const refreshToken = req.body.refreshToken
      const result = await refreshTokenService(refreshToken)
      new OK("refresh token success", result).send(res)

   }
}

module.exports= new Authentication()