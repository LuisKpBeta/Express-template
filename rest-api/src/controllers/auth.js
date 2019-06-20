const User = require('../models/User');
const handleError = require('../util/error');

const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw handleError.createError('Validation failed, entered data is incorrect.', 422, errors.array());
  }

  const { email, password } = req.body;
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      // const user = new User({
      //   email: email,
      //   password: hashedPassword
      // });

      return User.create({ email, password: hashedPassword})
      //return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User Created Successfully.', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        throw handleError.createError('A user with this email could not be found!', 401);
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        throw handleError.createError('Email or Password are incorret.', 401);
      }
      const token = jwt.sign({ // Create a new signature
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      }, process.env.SECRET_KEY, { expiresIn: '24h' });

      res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};