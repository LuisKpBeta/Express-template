module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'You must login.');
  res.redirect('/login');
};