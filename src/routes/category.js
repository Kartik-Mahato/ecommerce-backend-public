const router = require('express').Router();

const { createCategory, getCategory } = require('../controllers/categoryController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { requiresSignIn } = require('../middlewares/requiresSignIn');

router.post('/category/create', requiresSignIn, adminMiddleware, createCategory);
router.get('/category/getCategory', getCategory);

module.exports = router;