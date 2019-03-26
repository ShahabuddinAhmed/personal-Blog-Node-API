const express = require('express');
const router = express.Router();
const adminCheckAuth = require('../middleware/admin-auth');
const postController = require('../controller/post');
const multer = require('multer');
const dateFormat = require('dateformat');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, dateFormat('yyyymmddHHMMss').toString() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/all', postController.getPublishedPost);
router.get('/al', postController.getAllPost);
router.get('/readingpost/:postID', postController.getOnePost);
router.get('/post-type/:postID', postController.getPostType);
router.post('/create', upload.single('picture'), postController.createPost);
router.patch('/update/:postID', upload.single('picture'), postController.updatePost);
router.patch('/updateone/:postID', postController.updateOneItem);
router.delete('/delete/:postID', postController.deteletePost);

module.exports = router;