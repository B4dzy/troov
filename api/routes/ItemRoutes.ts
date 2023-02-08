import express from 'express';
import { getItem, createItem, updateItem, deleteItem } from '../controllers/ItemController';

const ItemRoutes = express.Router();

ItemRoutes.get('/item', getItem);
ItemRoutes.post('/item', createItem);
ItemRoutes.put('/item/:id', updateItem);
ItemRoutes.delete('/item/:id', deleteItem);

export default ItemRoutes;