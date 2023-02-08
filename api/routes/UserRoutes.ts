import express from 'express';
import UserController from '../controllers/UserController';

const UserRoutes = express.Router();

UserRoutes.get('/user', UserController.getUser);
UserRoutes.post('/user', UserController.createUser);
UserRoutes.put('/user/:id', UserController.updateUser);
UserRoutes.delete('/user/:id', UserController.deleteUser);

export default UserRoutes;