const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../middleware/admin-auth');
const aboutWriterController = require('../controller/about-writer');

router.get('/:aboutID', aboutWriterController.getAboutWriter);
router.patch('/update/:aboutID', aboutWriterController.updateAboutWriter);

module.exports = router;