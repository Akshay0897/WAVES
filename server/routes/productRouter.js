const express = require('express');
const router = express.Router();
const productRouter = require('../controllers/productController');
const authRouter = require('../middleware/authMiddleware');

router.post('/',authRouter.auth,authRouter.admin,productRouter.addProduct);
router.get('/byId',authRouter.auth,productRouter.getProductsByIds);
router.get('/byArrival',authRouter.auth,productRouter.getProductsByArrivals);
module.exports = router;