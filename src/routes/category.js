const router = require('express').Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const { addCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const { requiresSignIn } = require('../middlewares/requiresSignIn');

//multer config

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/category/create', requiresSignIn, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getCategory', getCategory);//fetch all categories
router.post('/category/update', upload.array('categoryImage'), updateCategory);//update categories
router.post('/category/delete', deleteCategory);//update categories


module.exports = router;