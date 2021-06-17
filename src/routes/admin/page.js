const router = require('express').Router();

const { createPage, getPage } = require('../../controllers/admin/page.controller');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');
const { upload } = require('../../middlewares/fileUploader');
const { requiresSignIn } = require('../../middlewares/requiresSignIn');


router.post('/page/create',
    requiresSignIn,
    adminMiddleware,
    upload.fields([
        { name: 'banners' },
        { name: 'products' }
    ]),
    createPage
);

router.get('/page/:category/:type', getPage);

module.exports = router;