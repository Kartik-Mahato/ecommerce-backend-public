const router = require('express').Router();

const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { userMiddleware } = require('../middlewares/userMiddleware');
const { addAddress, getAddress } = require('../controllers/addressController');

router.post('/user/address/create', requiresSignIn, userMiddleware, addAddress);
router.post('/user/getAddress', requiresSignIn, userMiddleware, getAddress);

module.exports = router