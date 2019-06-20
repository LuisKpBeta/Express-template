const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is-auth');
const upload = require('multer')(require('../config/upload'))

const mainController = require('../controllers/main');

router.get('/', mainController.getIndex);

// Protected route - needs a valid token
router.get('/authenticated', isAuth, mainController.getRouteAuthenticated);

// Route that receives an image (only one)
router.post('/postWithImage', upload.single('image'), mainController.postRouteWithImage);

module.exports = router;