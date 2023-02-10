const express = require("express");
const router = express.Router();

const sectionController = require("../controllers/sectionController");

router.post("/", sectionController.handlePostUserSection);

module.exports = router;
