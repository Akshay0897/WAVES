const express = require('express');
const router = express.Router();
const woodController = require('../controllers/woodController');
const authRouter = require('../middleware/authMiddleware');

router.post('/add',authRouter.auth,authRouter.admin,woodController.addWood);
router.get('/',authRouter.auth,woodController.getWoods);
module.exports = router;