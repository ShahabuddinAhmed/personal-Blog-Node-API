const express = require('express');
const router = express.Router();
const adminCheckAuth = require('../middleware/admin-auth');
const replayController = require('../controller/replay');

router.post('/create', replayController.createReplay);
router.get('/:replayID', replayController.getOneReplay);
router.patch('/update/:replayID', replayController.updateReplay);
router.delete('/delete/:replayID', replayController.deteleteReplay);

module.exports = router;