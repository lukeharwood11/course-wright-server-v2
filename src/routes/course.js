const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/:id", courseController.handleGetCourse);
router.post("/", courseController.handlePostUserCourse);
router.patch("/:id", courseController.handlePatchUserCourse);

module.exports = router;
