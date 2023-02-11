import { Request, Response } from 'express';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';

/** Classe contrôleur regroupant les méthodes user. */
class UserController {

    /**
     * POST /api/auth
     * @description Permet d'authentifier un utilisateur
     * @example { email: 'email@example.com' password: 'abc123' }
     * @return {boolean} 401 - Unauthorized - application/json
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            const passwordMatch = await user?.comparePassword(password);

            if (!passwordMatch || typeof passwordMatch === 'undefined') {
                return res.status(401).send(false);
            }

            const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET || 'JWT_SECRET', { expiresIn: '30d' });

            res.status(200).send(token);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * GET /api/auth/me
     * @description Permet de récupérer les informations d'un utilisateur authentifié
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async authenticatedUser(req: Request | any, res: Response) {
        try {
            const token = req.headers.authorization?.split(" ")[1] as string;
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET') as any;

            res.status(200).send(req.user);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async checkTokenUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(" ")[1] as string;
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET') as any;

            res.status(200).json({ valid: true });
        } catch (error) {
            res.status(200).json({ valid: false });
        }
    }

    /**
     * GET /api/item/:id
     * @description Permet de récupérer un utilisateur par son id
     * @property {string} id
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async getUser(req: Request, res: Response) {
        try {
            const data = await User.findById(req.params.id);

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * GET /api/user
     * @description Permet de récupérer l'entièreté des utilisateurs
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async getAllUser(req: Request, res: Response) {
        try {
            const data = await User.find();

            res.status(200).send(data);

        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * POST /api/user
     * @description Permet de créer un nouveau utilisateur
     * @example { email: 'email@example.com' username: 'Example', password: 'abc123' }
     * @property {string} email.required - L'email de l'utilisateur
     * @property {string} name.required - Le nom d'utilisateur
     * @property {string} password.required - Le mot de passe de l'utilisateur
     * @return {object} 201 - Created - application/json
     * @return {object} 500 - Internal Server Error
     */
    async createUser(req: Request, res: Response) {
        try {
            const newUser = new User(req.body);
            const data = await newUser.save();

            res.status(201).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * PUT /api/user/:id
     * @description Permet de modifier un utilisateur par son id
     * @example { username: 'Example2' }
     * @property {string} email - L'email de l'utilisateur
     * @property {string} name - Le nom d'utilisateur
     * @property {string} password - Le mot de passe de l'utilisateur
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async updateUser(req: Request, res: Response) {
        try {
            const data = await User.findByIdAndUpdate(req.params.id, req.body);

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * DELETE /api/user/:id
     * @description Permet de supprimer un utilisateur par son id
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
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