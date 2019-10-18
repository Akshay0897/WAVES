const express = require('express');
const router = express.Router();
const brandRouter = require('../controllers/brandController');
const authRouter = require('../middleware/authMiddleware');

router.post('/add',authRouter.auth,authRouter.admin,brandRouter.addBrand);

module.exports = router;