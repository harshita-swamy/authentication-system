import {body} from 'express-validator';

const registerValidation = [
    body('name')
    .notEmpty()
    .withMessage('Name is Required'),

    body('email')
    .notEmpty()
    .withMessage('Email is Required')
    .isEmail()
    .withMessage('Invalid Email Format'),

    body('password')
    .notEmpty()
    .withMessage('Password is Required')
    .isLength({min:6})
    .withMessage('Password must be at least 6 Digits'),

    body('phone')
    .notEmpty()
    .withMessage('Phone number is Required')
    .isLength({min:10 , max:10})
    .withMessage('Phone Number must be 10 Digits')
]

export {registerValidation};