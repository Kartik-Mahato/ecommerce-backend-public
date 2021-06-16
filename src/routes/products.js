const router = require('express').Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { createProduct, getProductsBySlug } = require('../controllers/productController');
const { upload } = require('../middlewares/fileUploader');

router.post('/product/create', requiresSignIn, adminMiddleware, upload.array('productPictures'), createProduct);
router.get('/products/:slug', getProductsBySlug);


module.exports = router;