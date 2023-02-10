import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { Request, Response, NextFunction } from 'express';

export const authenticated = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] as string;
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET') as any;

        req.user = await User.findById(decoded._id);

        next();
    } catch (err) {
        res.status(401).send(err);
    }
}