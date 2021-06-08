const router = require('express').Router();
// const { requiresSignIn } = require('../../middlewares/requiresSignIn');
const { signup, signin } = require('../../controllers/admin/authController');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../../validators/auth');
// const { profile } = require('../controllers/profileController');

//authRoutes
router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);

//profile
// router.get('/profile/:id', requiresSignIn, profile);

module.exports = router;