const express = require("express");
const router = express.Router();
const chatsControllers = require("../controllers/chats-controller");

module.exports = router;

// Add chat
router.post("/", chatsControllers.createChat);

router.post("/find", chatsControllers.getChats);

router.get("/:property/:value", chatsControllers.getChat);

router.patch("/:_id", chatsControllers.updateChat);

router.delete("/:_id", chatsControllers.deleteChat);
