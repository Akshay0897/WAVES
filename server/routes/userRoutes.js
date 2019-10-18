const express = require('express');
const router = express.Router();
const authController = require('../middleware/authMiddleware');

router.post('/login',authController.login);
router.post('/register',authController.register);
router.get('/logout',authController.auth,authController.logout);

module.exports = router
