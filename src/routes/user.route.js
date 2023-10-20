const express = require('express');
const { handleError } = require('../core/error.response');
// const {getUser: getUserController}=require("../controllers/user.controller")
// const {searchUser: searchUserController}=require("../controllers/user.controller")
// const { friendRequest: friendRequestController } = require("../controllers/friendShip.controller")
// const {getProfile: getProfileCotroller} =require("../controllers/user.controller")

const UserController = require('../controllers/user.controller');

const router = express.Router();

const controller = new UserController();
// ----------------------GET-------------------------------
router.get('/users/', handleError(controller.getUser));

router.get('/profile/:userId', handleError(controller.getProfile));

router.post('/search', handleError(controller.searchUser));

module.exports = router;
