const express = require("express")
const { handleError } = require("../core/error.response")
const {addConversation:addConversationController}=require("../controllers/chat.controller")
const {getConversation:getConversationController}=require("../controllers/chat.controller")
const {getMessageConversation:getMessageConversationController}=require("../controllers/chat.controller")

const router= express.Router()


router.post("/add-conversation", handleError(addConversationController))
router.get("/get-conversations", handleError(getConversationController))
router.get("/get-conversations-message/:conversationId", handleError(getMessageConversationController))


module.exports = router