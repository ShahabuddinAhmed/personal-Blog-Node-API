const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../middleware/admin-auth');
const adminController = require('../controller/admin');

router.get('/all', adminController.getAllAdmin);
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/:adminID', adminController.getOneAdmin);
router.patch('/update/:adminID', adminController.updateAdmin);
router.delete('/delete/:adminID', adminController.deteleteAdmin);

module.exports = router;