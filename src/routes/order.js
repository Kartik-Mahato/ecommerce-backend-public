const router = require('express').Router();

const { addOrder, getOrders, getOrder } = require('../controllers/orderController.js');
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { userMiddleware } = require('../middlewares/userMiddleware');

router.post('/addOrder', requiresSignIn, userMiddleware, addOrder);
router.get('/getOrders', requiresSignIn, userMiddleware, getOrders);
router.post('/getOrder', requiresSignIn, userMiddleware, getOrder);

module.exports = router;