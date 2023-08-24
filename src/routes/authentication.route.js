const express = require("express") 
const { signUp : signUpController , signIn:signInController , signOut:signOutController, refreshToken: refreshTokenController } = require("../controllers/authentication.controller")
const { handleError } = require("../core/error.response")
const router = express.Router()


// router.post("/sign-up", loginController )
router.post("/sign-up", handleError(signUpController))
router.post("/sign-in", handleError(signInController))
router.post("/sign-out", handleError(signOutController))
router.post("/refresh-token", handleError(refreshTokenController))


module.exports=router


// handleError(signUpController) 