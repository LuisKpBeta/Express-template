const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');
const isAuth = require('../middleware/is-auth');

router.get('/', mainController.getIndex);

// Restricted Area - only logged in user's
router.get('/pageAuthenticated', isAuth, mainController.getPageAuthenticated)

module.exports = router;