import express from 'express';
import ItemController from '../controllers/ItemController';

const ItemRoutes = express.Router();

ItemRoutes.get('/item/:id', ItemController.getItem);
ItemRoutes.get('/item', ItemController.getAllItem);
ItemRoutes.post('/item', ItemController.createItem);
ItemRoutes.put('/item/:id', ItemController.updateItem);
ItemRoutes.delete('/item/:id', ItemController.deleteItem);

export default ItemRoutes;