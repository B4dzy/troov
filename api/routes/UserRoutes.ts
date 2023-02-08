import express from 'express';
import UserController from '../controllers/UserController';

const UserRoutes = express.Router();

UserRoutes.post('/user/auth', UserController.authUser);
UserRoutes.get('/user/:id', UserController.getUser);
UserRoutes.get('/user', UserController.getAllUser);
UserRoutes.post('/user', UserController.createUser);
UserRoutes.put('/user/:id', UserController.updateUser);
UserRoutes.delete('/user/:id', UserController.deleteUser);

export default UserRoutes;