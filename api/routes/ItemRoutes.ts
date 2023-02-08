import express from 'express';
import ItemController from '../controllers/ItemController';
import { authenticated } from '../middlewares/authenticated';

const ItemRoutes = express.Router();

ItemRoutes.get('/item/:id', authenticated, ItemController.getItem);
ItemRoutes.get('/item', authenticated, ItemController.getAllItem);
ItemRoutes.post('/item', authenticated, ItemController.createItem);
ItemRoutes.put('/item/:id', authenticated, ItemController.updateItem);
ItemRoutes.delete('/item/:id', authenticated, ItemController.deleteItem);

export default ItemRoutes;