import express from 'express';
import UserController from '../controllers/UserController';
import { authenticated } from '../middlewares/authenticated';

const UserRoutes = express.Router();

UserRoutes.post('/auth', UserController.loginUser);
UserRoutes.get('/auth/me', authenticated, UserController.authenticatedUser);
UserRoutes.get('/user/:id', authenticated, UserController.getUser);
UserRoutes.get('/user', authenticated, UserController.getAllUser);
UserRoutes.post('/user', UserController.createUser);
UserRoutes.put('/user/:id', authenticated, UserController.updateUser);
UserRoutes.delete('/user/:id', authenticated, UserController.deleteUser);

export default UserRoutes;