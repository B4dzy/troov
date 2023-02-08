import { Request, Response } from 'express';
import User from '../models/UserModel';

export const getUser = async (req: Request, res: Response) => {
    try {
        const data = await User.find();

        res.status(200).send(data);

    } catch (error) {
        res.status(500).send(error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body);
        const data = await newUser.save();

        res.status(201).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};