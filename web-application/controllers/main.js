exports.getIndex = (req, res, next) => {
  res.render('index');
};

exports.getPageAuthenticated = (req, res, next) => {
  res.render('pageAuthenticated');
}