const express = require("express");
const usersControllers = require("../controllers/users-controller");
const router = express.Router();

module.exports = router;

router.post("/", usersControllers.createUser);

router.post("/chat-users", usersControllers.getUsers);

router.post("/find", usersControllers.findUsers);

router.get("/:property/:value", usersControllers.getUser);

router.patch("/chats/:_id", usersControllers.updateUserChats);

router.patch("/:_id", usersControllers.updateUser);

router.delete("/:_id", usersControllers.deleteUser);
