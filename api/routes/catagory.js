const express = require('express');
const router = express.Router();
const checkAdminAuth = require('../middleware/admin-auth');
const catagoryController = require('../controller/catagory');

router.get('/all', catagoryController.getAllCatagory);
router.post('/create', catagoryController.createCatagory);
router.patch('/update/:catagoryID', catagoryController.updateCatagory);
router.delete('/delete/:catagoryID', catagoryController.deteleteCatagory);

module.exports = router;