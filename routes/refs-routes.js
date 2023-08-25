const express = require("express");
const fileUpload = require("../middleware/file-upload");
const { check } = require("express-validator");

const refsControllers = require("../controllers/refs-controller");
const router = express.Router();

module.exports = router;

router.get("/", refsControllers.getRefs);

router.post(
  "/",
  fileUpload.single("image"),
  check("title").not().isEmpty(),
  refsControllers.creatRef
);

router.patch(
  "/:refId",
  fileUpload.single("image"),
  check("title").not().isEmpty(),
  refsControllers.updateRef
);

router.delete("/:refId", refsControllers.deleteRef);
