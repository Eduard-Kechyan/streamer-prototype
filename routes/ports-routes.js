const express = require("express");
const fileUpload = require("../middleware/file-upload");
const { check } = require("express-validator");

const portsControllers = require("../controllers/ports-controller");
const router = express.Router();

module.exports = router;

router.get("/", portsControllers.getPorts);

router.post(
  "/",
  fileUpload.single("image"),
  check("title").not().isEmpty(),
  portsControllers.creatPort
);

router.patch(
  "/:portId",
  fileUpload.single("image"),
  check("title").not().isEmpty(),
  portsControllers.updatePort
);

router.delete("/:portId", portsControllers.deletePort);