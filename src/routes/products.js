const router = require('express').Router();

const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts } = require('../controllers/productController');
const { upload } = require('../middlewares/fileUploader');

router.post('/product/create', requiresSignIn, adminMiddleware, upload.array('productPictures'), createProduct);

router.get('/product/:productId', getProductDetailsById);

router.get('/products/:slug', getProductsBySlug);

router.delete('/product/deleteProductById', requiresSignIn, adminMiddleware, deleteProductById);

router.post('/product/getProducts', requiresSignIn, adminMiddleware, getProducts);


module.exports = router;