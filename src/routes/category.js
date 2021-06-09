const router = require('express').Router();

const { addCategory, getCategory } = require('../controllers/categoryController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { requiresSignIn } = require('../middlewares/requiresSignIn');

router.post('/category/create', requiresSignIn, adminMiddleware, addCategory);
router.get('/category/getCategory', getCategory);//fetch all categories


module.exports = router;