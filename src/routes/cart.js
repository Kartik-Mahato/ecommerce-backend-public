const router = require('express').Router();

const { addItemToCart, getCartItems } = require('../controllers/cartController.js');
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { userMiddleware } = require('../middlewares/userMiddleware');

router.post('/user/cart/addToCart', requiresSignIn, userMiddleware, addItemToCart);
router.post('/user/getCartItems', requiresSignIn, userMiddleware, getCartItems);

module.exports = router;