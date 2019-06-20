const jwt = require('jsonwebtoken');
const handleError = require('../util/error');

module.exports = (req, res, next) => {
  // Gets the headear "authorization"
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw handleError.createError('Not Authenticated.', 401);
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw handleError.createError('Token Invalid', 500);
  }
  if (!decodedToken) {
    throw handleError.createError('Not Authenticated.', 401);
  }
  req.userId = decodedToken.userId;
  next();
};