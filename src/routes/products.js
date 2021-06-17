const router = require('express').Router();

const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { createProduct, getProductsBySlug, getProductDetailsById } = require('../controllers/productController');
const { upload } = require('../middlewares/fileUploader');

router.post('/product/create', requiresSignIn, adminMiddleware, upload.array('productPictures'), createProduct);
router.get('/product/:productId', getProductDetailsById);
router.get('/products/:slug', getProductsBySlug);


module.exports = router;