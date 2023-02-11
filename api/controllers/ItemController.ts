import { Request, Response } from 'express';
import Item from '../models/ItemModel';

/** Classe contrôleur regroupant les méthodes item. */
class ItemController {

    /**
     * GET /api/item
     * @description Permet de récupérer l'entièreté des items
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async getAllItem(req: Request, res: Response) {
        try {
            const data = await Item.find();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * GET /api/item/:id
     * @description Permet de récupérer un item par son id
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async getItem(req: Request, res: Response) {
        try {
            const data = await Item.findById(req.params.id);

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * POST /api/item
     * @description Permet de créer un nouveau item
     * @example { name: 'Objet 1' }
     * @property {string} name.required - Le nom de l'objet
     * @return {object} 201 - Created - application/json
     * @return {object} 500 - Internal Server Error
     */
    async createItem(req: Request, res: Response) {
        try {
            const newItem = new Item(req.body);
            const data = await newItem.save();
            res.status(201).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * PUT /api/item/:id
     * @description Permet de modifier un item par son id
     * @property {string} name - Le nom de l'objet
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async updateItem(req: Request, res: Response) {
        try {
            const data = await Item.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    /**
     * DELETE /api/item/:id
     * @description Permet de supprimer un item par son id
     * @return {object} 200 - Success response - application/json
     * @return {object} 500 - Internal Server Error
     */
    async deleteItem(req: Request, res: Response) {
        try {
            const data = await Item.findByIdAndDelete(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new ItemController();