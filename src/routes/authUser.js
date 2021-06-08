const router = require('express').Router();
const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { signup, signin } = require('../controllers/authController');
const { profile } = require('../controllers/profileController');

//authRoutes
router.post('/signup', signup);
router.post('/signin', signin);

//profile
router.get('/profile/:id', requiresSignIn, profile);

module.exports = router;