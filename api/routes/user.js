const express = require('express');
const router = express.Router();
const checkUserAuth = require('../middleware/user-auth');
const userController = require('../controller/user');

router.get('/all', userController.getAllUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:userID', userController.getOneUser);
router.patch('/update/:userID', userController.updateUser);
router.delete('/delete/:userID', userController.deteleteUser);

module.exports = router;