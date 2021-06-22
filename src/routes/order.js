const router = require('express').Router();

const { addOrder, getOrders } = require('../controllers/orderController.js');
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { userMiddleware } = require('../middlewares/userMiddleware');

router.post('/addOrder', requiresSignIn, userMiddleware, addOrder);
router.get('/getOrders', requiresSignIn, userMiddleware, getOrders);

module.exports = router;