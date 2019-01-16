const express = require('express');
const router = express.Router();
const adminCheckAuth = require('../middleware/admin-auth');
const replayController = require('../controller/replay');

router.post('/create', replayController.createReplay);
router.get('/:commentID', replayController.getOneReplay);
router.patch('/update/:commentID', replayController.updateReplay);
router.delete('/delete/:commentID', replayController.deteleteReplay);

module.exports = router;