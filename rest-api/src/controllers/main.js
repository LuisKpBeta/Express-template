const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.getIndex = (req, res, next) => {
  res.send('Hello World');
};

exports.getRouteAuthenticated = (req, res, next) => {
  res.json({ msg:'Route Just for valid Tokens'});
}

exports.postRouteWithImage = (req, res, next) => {
  // Change the name of the variable from filename to image
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