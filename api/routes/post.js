const express = require('express');
const router = express.Router();
const adminCheckAuth = require('../middleware/admin-auth');
const postController = require('../controller/post');

router.get('/all', postController.getAllPost);
router.post('/create', postController.createPost);
router.patch('/update/:postID', postController.updatePost);
router.delete('/delete/:postID', postController.deteletePost);

module.exports = router;