# Express Web Application Example

> ### Example Node (Express + Mongoose) codebase containing an example of a web application.

# Getting started

To get the Node server running locally:

- Clone this repo.
- `npm install` to install all required dependencies.
- Install MongoDB or use MongoDB Atlas.
- Create a nodemon.json (or any env file) with the following environment variables: MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DATABASE, PORT, SECRET_KEY, MAIL_USERNAME, MAIL_PASSWORD, SMTP_PORT, SMTP_HOST.
- `npm run dev` to start the local server.

# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-validator](https://github.com/express-validator/express-validator) - For validations on received forms
- [express-session](https://github.com/expressjs/session) - Creates a session middleware
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [passport-local](https://github.com/jaredhanson/passport-local) - Passport strategy for autheticating with a username and password
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Library to hash passwords
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [connect-mongodb-session](https://github.com/mongodb-js/connect-mongodb-session) - Used to save the sessions created with express on a mongoDB database
- [morgan](https://github.com/expressjs/morgan) - Middleware that logs all the HTTP requests
- [winston](https://github.com/winstonjs/winston) - Simple and universal logging library
- [compression](https://github.com/expressjs/compression) - Middleware that will compact the JSON response and the entire static files response
- [helmet](https://github.com/helmetjs/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers
- [nodemailer](https://github.com/nodemailer/nodemailer) - Send e-mails from nodejs
- [pug](https://github.com/pugjs/pug) - Template engine chosen for this project
- [csurf](https://github.com/expressjs/csurf) - CSRF protection middleware (require a session middleware or cookie-parser)
- [connect-flash](https://github.com/jaredhanson/connect-flash) - Special area of the session used for storing messages

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. Also has a lot of configurations.
- `public/` - THis folder contains public files such as javascript and css files for our pages.
- `config/` - This folder contains configuration for passport.
- `routes/` - This folder contains the route definitions for our API.
- `controllers/` - This folder contains all controllers for our routes.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `middleware/` - This folder contains custom middlewares to be used anywhere.
- `util/` - This folder contains usefull stuffs to use all over the application.
- `views/` - This folder contains all the views.

## Authentication

Requests are authenticated using sessions.