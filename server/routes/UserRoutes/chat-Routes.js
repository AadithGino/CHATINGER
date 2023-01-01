const express = require("express")
const router = express.Router();
const chatController = require('../../controller/User/chat-features')

// Create and access chat 
router.post("/",chatController.AccessChat)

//create group chat 
router.post("/group-chat",chatController.createGroupChat)

// send message 
router.post("/send-message",chatController.sendMessage)

// get chats 
router.get("/get-chats",chatController.GetChats)

// get messages 
router.get("/get-messages",chatController.getMessages)

//members of group chat 
router.get("/group-members",chatController.GropMembers)

module.exports = router;