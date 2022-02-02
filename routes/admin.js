const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
router.get('/', adminController.getIndex);
router.post('/login', adminController.postLogin);
router.get('/admin', adminController.getAdminController);
//router.post('/admin', adminController.postAdminController);
router.post('/logout', adminController.logout);
module.exports = router;