import { Request, Response } from 'express';
import User from '../models/UserModel';

class UserController {
    async getUser(req: Request, res: Response) {
        try {
            const data = await User.find();

            res.status(200).send(data);

        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const newUser = new User(req.body);
            const data = await newUser.save();

            res.status(201).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const data = await User.findByIdAndUpdate(req.params.id, req.body);

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const data = await User.findByIdAndDelete(req.params.id);

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new UserController();