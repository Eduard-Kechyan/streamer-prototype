const express = require("express");
const authControllers = require("../controllers/auth-controller");
const router = express.Router();

module.exports = router;

router.post("/signup/", authControllers.signUp);
router.post("/login/", authControllers.logIn);
