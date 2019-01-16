const express = require('express');
const router = express.Router();
const adminCheckAuth = require('../middleware/admin-auth');
const commentController = require('../controller/comment');

router.post('/create', commentController.createComment);
router.get('/:commentID', commentController.getOneComment);
router.patch('/update/:commentID', commentController.updateComment);
router.delete('/delete/:commentID', commentController.deteleteCommant);

module.exports = router;