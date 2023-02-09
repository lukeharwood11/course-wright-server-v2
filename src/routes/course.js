const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.handlePostUserCourse);
router.patch("/:id", courseController.handlePatchUserCourse);

module.exports = router;
