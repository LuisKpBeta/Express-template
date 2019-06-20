const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', [
  body('email')
    .isEmail()
    .withMessage('Invalid E-mail format.')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then( userDoc => {
          if (userDoc) {
            return Promise.reject('E-mail address already exists.');
          }
        })
    })
    .normalizeEmail({ gmail_remove_dots: false }),
  body('password').trim().isLength({ min: 5 }).withMessage('Password must have at least 5 characters.')
], authController.signup);

router.post('/login', authController.login);

module.exports = router;