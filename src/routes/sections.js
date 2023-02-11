const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

router.get('/', sectionController.handleGetUserSections);
router.post('/', sectionController.handlePostUserSectionBatch);

module.exports = router;