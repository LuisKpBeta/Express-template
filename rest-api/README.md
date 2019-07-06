# Express REST API Example

> ### Example Node (Express + Mongoose) codebase containing simple examples of GET and POST with JWT Authentication.

# Getting started

To get the Node server running locally:

- Clone this repo.
- `npm install` to install all required dependencies.
- Install MongoDB or use MongoDB Atlas.
- Create a nodemon.json (or any env file) with the following environment variables: MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DATABASE, PORT, SECRET_KEY.
- `npm run dev` to start the local server.

# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-validator](https://github.com/express-validator/express-validator) - For validations on received forms
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication and validations
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Library to hash passwords
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [morgan](https://github.com/expressjs/morgan) - Middleware that logs all the HTTP requests
- [winston](https://github.com/winstonjs/winston) - Simple and universal logging library
- [compression](https://github.com/expressjs/compression) - Middleware that will compact the JSON response and the entire static files response
- [cors](https://github.com/expressjs/cors) - Enable cors in the application
- [helmet](https://github.com/helmetjs/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers
- [multer](https://github.com/expressjs/multer) - Middleware to handle multipart/form-data, which is primarily used for uploading files
- [sharp](https://github.com/lovell/sharp) - For resizing image received from client
- [uuid](https://github.com/kelektiv/node-uuid) - Package used to give unique names for new images received from the client

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose.
- `config/` - This folder contains configuration for uploads.
- `routes/` - This folder contains the route definitions for our API.
- `controllers/` - This folder contains all controllers for our routes.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `middleware/` - This folder contains custom middlewares to be used anywhere.
- `util/` - This folder contains usefull stuffs to use all over the application.

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT.