const multer = require('multer')
const path = require('path')
const uuidv4 = require('uuid/v4');

const handleError = require('../util/error');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'public', 'images'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public', 'images'))
    },
    filename: (req, file, callback) => {
      callback(null, uuidv4() + '_' + file.originalname)
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(handleError.createError('File extension not supported.', 415), false)
    }
  }
}