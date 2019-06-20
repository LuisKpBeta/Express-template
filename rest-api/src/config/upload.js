const multer = require('multer')
const path = require('path')
const uuidv4 = require('uuid/v4');

module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'public', 'images'),
    filename: function (req, file, callback) {
      callback(null, uuidv4() + '_' + file.originalname)
    }
  }),
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}