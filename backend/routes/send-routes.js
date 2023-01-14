const express = require("express");
const sendControllers = require("../controllers/send-controller");
const router = express.Router();

module.exports = router;

router.get("/:data", sendControllers.sendData);
