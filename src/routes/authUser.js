const router = require('express').Router();

const { requiresSignIn } = require('../middlewares/requiresSignIn');
const { signup, signin } = require('../controllers/authController');
const { profile } = require('../controllers/profileController');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../validators/auth');

//authRoutes
router.post('/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/signin', validateSignInRequest, isRequestValidated, signin);

//profile
router.get('/profile/:id', requiresSignIn, profile);

module.exports = router;