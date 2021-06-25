const router = require('express').Router();

const { updateOrder, getCustomerOrders } = require('../../controllers/admin/adminOrderController');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');
const { requiresSignIn } = require('../../middlewares/requiresSignIn');

router.post('/admin/order/update', requiresSignIn, adminMiddleware, updateOrder);
router.post('/admin/order/getCustomerOrders', requiresSignIn, adminMiddleware, getCustomerOrders);

module.exports = router;