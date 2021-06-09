const router = require('express').Router();

const { addItemToCart } = require('../controllers/cartController.js');
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { userMiddleware } = require('../middlewares/userMiddleware');

router.post('/user/cart/addToCart', requiresSignIn, userMiddleware, addItemToCart);


module.exports = router;