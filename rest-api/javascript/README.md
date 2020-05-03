<h1 align="center">Express - REST API (Javascript)</h1>
<p align="center">This repository contains an express server with everything configured. Check the list below to see all the features already configured</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
  <a href="linkedin.com/in/filliperomero">
    <img alt="Made by Fillipe Romero" src="https://img.shields.io/badge/Made%20by-Fillipe%20Romero-blueviolet">
  </a>
</p>

<hr />

# Getting started

1. Run `yarn outdated` to check if any dependency should be updated
2. Create a `.env` file using `.env.example` file as an example
3. Inside the folder, run `yarn` to install all dependencies
4. Run `yarn dev` to start the server

# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [yup](https://github.com/jquense/yup) - For validations on received forms
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication and validations
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Library to hash passwords
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [compression](https://github.com/expressjs/compression) - Middleware that will compact the JSON response and the entire static files response
- [cors](https://github.com/expressjs/cors) - Enable cors in the application
- [helmet](https://github.com/helmetjs/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers
- [multer](https://github.com/expressjs/multer) - Middleware to handle multipart/form-data, which is primarily used for uploading files

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
