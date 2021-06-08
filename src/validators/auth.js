const { check } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateSignUpRequest = [
    check('firstname')
        .notEmpty()
        .withMessage('firstname is a required field'),
    check('lastname')
        .notEmpty()
        .withMessage('lastname is a required field'),
    check('email')
        .isEmail()
        .withMessage('Valid Email is Required'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Minimum length of password is 5'),
]

exports.validateSignInRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is Required'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Minimum length of password is 5'),
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.array().length) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }

    next();
}