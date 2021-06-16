const router = require('express').Router();

const { createPage } = require('../../controllers/admin/page.controller');
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

module.exports = router;