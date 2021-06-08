const router = require('express').Router();
// const { requiresSignIn } = require('../../middlewares/requiresSignIn');
const { signup, signin } = require('../../controllers/admin/authController');
// const { profile } = require('../controllers/profileController');

//authRoutes
router.post('/admin/signup', signup);
router.post('/admin/signin', signin);

//profile
// router.get('/profile/:id', requiresSignIn, profile);

module.exports = router;