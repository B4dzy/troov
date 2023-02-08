import { Request, Response } from 'express';
import Item from '../models/ItemModel';

export const getItem = async (req: Request, res: Response) => {
    try {
        const data = await Item.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createItem = async (req: Request, res: Response) => {
    try {
        const newItem = new Item(req.body);
        const data = await newItem.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const data = await Item.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const data = await Item.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};