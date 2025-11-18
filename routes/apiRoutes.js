import express from 'express';
import dotenv from 'dotenv';
import auth from '../middleware/auth.js';
import productController from '../controllers/productController';
import categoryController from '../controllers/categoryController';

dotenv.config();

let verif = auth.verifyToken;

//product routes
export const product = express.Router();
product.get('/',verif,productController.index);
product.post('/',verif,productController.store);
product.patch('/:id',verif,productController.update);
product.delete('/',verif,productController.destroy);
