const crypto = require('crypto');

const passport = require('passport');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
  	user: process.env.MAIL_USERNAME,
  	pass: process.env.MAIL_PASSWORD
  }
});

exports.getLogin = (req, res, next) => {
  // Do not render the Login page if you are already logged in
  if (req.isAuthenticated()) return res.redirect('/');
  res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/pageAuthenticated',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    oldInput: { email: "", password: "", confirmPassword: "" }
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
        oldInput: { email: email, password: password, confirmPassword: req.body.confirmPassword },
        errors: errors.array()
      });
  }

  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User({ email: email, password: hashedPassword });
      return user.save();
    })
    .then(result => {
      req.flash('success_msg', 'You are now registered, please log in.')
      res.redirect('/login');
      return transporter.sendMail({
        from: 'elainearcheage1@gmail.com',
        to: email,
        subject: 'Signup succeeded',
        html: '<h1>You successfully signed up!</h1>'});
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = err.statusCode || 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
};

exports.getReset = (req, res, next) => {
  res.render('auth/reset');
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    const token = buffer.toString('hex');
    User.findOne({email: req.body.email})
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save()
          .then(result => {
            req.flash('success_msg', 'Reset Password Successfully! Please check your email to continue.')
            res.redirect('/reset');
            return transporter.sendMail({
              from: 'teste@teste.com',
              to: req.body.email,
              subject: 'Password Reset',
              html: `
                <p>You requested a password reset</p>
                <p>Click this <a href="http://localhost:3000/new-password/${token}">Link</a> to set a new password.</p>
              `
            });
          })
      })
      .catch((err) => {
        const error = new Error(err);
        error.statusCode = err.statusCode || 500;
        return next(error);
      });
  });
}

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid Token. Please submit another Reset Password.');
        return res.redirect('/reset');
      }
      res.render('auth/new-password', {
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = err.statusCode || 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({ resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
    })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid Token. Please submit another Reset Password.');
        return res.redirect('/reset');
      }
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      req.flash('success_msg', 'New Password Set! Please log in.')
      res.redirect('/login');
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = err.statusCode || 500;
      return next(error);
    });
};