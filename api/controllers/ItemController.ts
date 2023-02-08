import { Request, Response } from 'express';
import Item from '../models/ItemModel';

class ItemController {

    async getAllItem(req: Request, res: Response) {
        try {
            const data = await Item.find();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getItem(req: Request, res: Response) {
        try {
            const data = await Item.findById(req.params.id);

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createItem(req: Request, res: Response) {
        try {
            const newItem = new Item(req.body);
            const data = await newItem.save();
            res.status(201).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateItem(req: Request, res: Response) {
        try {
            const data = await Item.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

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