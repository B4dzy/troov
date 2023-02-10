import { Request, Response } from 'express';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';

class UserController {

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            const passwordMatch = await user?.comparePassword(password);

            if (!passwordMatch || typeof passwordMatch === 'undefined') {
                return res.status(401).send(false);
            }

            const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET || 'JWT_SECRET', { expiresIn: '1h' });

            res.status(200).send(token);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async authenticatedUser(req: Request | any, res: Response) {
        try {
            const token = req.headers.authorization?.split(" ")[1] as string;
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET') as any;


            res.status(200).send(req.user);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const data = await User.findById(req.params.id);

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAllUser(req: Request, res: Response) {
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