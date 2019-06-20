const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const logger = require("./util/logger");
const cors = require('cors');

var mainRouter = require('./routes/main');
var authRouter = require('./routes/auth');

const app = express();

// Enable Cors
app.use(cors());

// Secure headers and Compression files.
// Disable it if your provider already do it.
app.use(require('helmet')());
app.use(require('compression')());

// Logger setup
app.use(require('morgan')('combined', { "stream": logger.stream }));

// Body Parser and Static Files setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.resolve(__dirname, '..', 'public', 'images', 'resized')));

// Routes
app.use('/main', mainRouter);
app.use('/auth', authRouter);

// Error handler - Happens whenever throw an error
app.use((err, req, res, next) => {
  logger.error("Status Code:" + err.statusCode + " - Message: " + err.message);
  res.status(err.statusCode).json({ message: err.message, details: err.details });
});

const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo01-qo8ey.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;

// Setup Server with Database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Server is running in Port: ${process.env.PORT || 3000}`);
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => console.log(err));