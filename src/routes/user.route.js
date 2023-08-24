const express= require("express")
const { handleError } = require("../core/error.response")
const {getUser: getUserController}=require("../controllers/user.controller")
const { addFriend: addFriendController } = require("../controllers/friendShip.controller")
const {getProfile: getProfileCotroller} =require("../controllers/user.controller")

const router= express.Router()

router.get("/get-user/",handleError(getUserController))
router.get("/get-profile/:userId",handleError(getProfileCotroller))

router.get("/add-friend", handleError(addFriendController))

router.get("/test-middleware", async( req, res, next)=>{
    
    console.log("data====>")
    console.log("req====>",req.home)

    return res.json("OKE NE USER")

})

module.exports = router