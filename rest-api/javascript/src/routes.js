import { Router } from 'express';
import multer from 'multer';
import bruteForce from './config/brute';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import ExampleController from './app/controllers/ExampleController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import ValidateUserStore from './app/validators/UserStore';
import ValidateUserUpdate from './app/validators/UserUpdate';
import ValidateSessionStore from './app/validators/SessionStore';

import authMiddlware from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', ValidateUserStore, UserController.store);
routes.post(
  '/sessions',
  bruteForce.prevent,
  ValidateSessionStore,
  SessionController.store
);

// All routes below are protected by the token
routes.use(authMiddlware);

routes.put('/users', ValidateUserUpdate, UserController.update);

routes.post('/files', uploads.single('file'), FileController.store);

routes.get('/example', ExampleController.index);
routes.post('/example', ExampleController.store);
routes.put('/example/:id', ExampleController.update);
routes.delete('/example/:id', ExampleController.delete);

export default routes;
