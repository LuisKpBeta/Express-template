const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const handleError = require('../util/error');

exports.getIndex = (req, res, next) => {
  res.send('Hello World');
};

exports.getRouteAuthenticated = (req, res, next) => {
  res.json({ msg:'Route Just for valid Tokens'});
}

exports.postRouteWithImage = (req, res, next) => {
  if (!req.file) {
    // TODO: Create a middleware for this because if we got here, multer filter was activated and should not come here to throw an error.
    throw handleError.createError('File extension not supported.', 415);
  }
  const { filename: image } = req.file

  // Forces the image to be jpg
  const [name] = image.split('.')
  const filename = `${name}.jpg`

  sharp(req.file.path)
    .resize(500)
    .jpeg({ quality: 70 })
    .toFile(path.resolve(req.file.destination, 'resized', filename))
    .then(() => {
      clearImage(req.file.path)
      res.status(200).json({ message: 'Image received' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

const clearImage = filePath => {
  fs.unlink(filePath, err => console.log(err));
};