const router = require('express').Router();
// const { requiresSignIn } = require('../../middlewares/requiresSignIn');
const { signup, signin, signout } = require('../../controllers/admin/authController');
const { requiresSignIn } = require('../../middlewares/requiresSignIn');
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../../validators/auth');
// const { profile } = require('../controllers/profileController');

//authRoutes
router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/admin/signout', signout);

//profile
// router.get('/profile/:id', requiresSignIn, profile);

module.exports = router;