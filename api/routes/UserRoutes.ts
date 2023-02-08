import express from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/UserController';

const UserRoutes = express.Router();

UserRoutes.get('/user', getUser);
UserRoutes.post('/user', createUser);
UserRoutes.put('/user/:id', updateUser);
UserRoutes.delete('/user/:id', deleteUser);

export default UserRoutes;