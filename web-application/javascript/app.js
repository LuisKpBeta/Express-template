var path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);

const logger = require("./util/logger");
const mainRouter = require('./routes/main');
const authRouter = require('./routes/auth');

const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo01-qo8ey.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true`;

const app = express();

// Secure headers and Compression files.
// Disable it if your provider already do it.
app.use(require('helmet')());
app.use(require('compression')());

// Passport Configuration
require('./config/passport')(passport);

// View engine setup for PUG engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Logger setup
app.use(require('morgan')('combined', { "stream": logger.stream }));

// Body Parser and Static Files setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use CSRF Token's
app.use(require('csurf')());

// Connect Flash
app.use(require('connect-flash')());

// Globals variables
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.csrfToken = req.csrfToken();
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use(mainRouter);
app.use(authRouter);

// Page Not Found - Error 404
app.use((req, res, next) => {
  res.status(404).render('404')
});

// Error handler
app.use((err, req, res, next) => {
  logger.error("Status Code: " + err.statusCode + " - Message: " + err.message);

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.statusCode || 500);
  res.render('error');
});

// Setup Server
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log(`Server is running in Port: ${process.env.PORT || 3000}`);
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => console.log(err));