import express from 'express';
import dotenv from 'dotenv';
import auth from '../middleware/auth.js';
import productController from '../controllers/productController.js';
import categoryController from '../controllers/categoryController.js';

dotenv.config();

let verif = auth.verifyToken;

//product routes
export const product = express.Router();
product.get('/',verif,productController.index);
product.post('/',verif,productController.store);
product.patch('/:id',verif,productController.update);
product.delete('/',verif,productController.destroy);

// category routes
export const category = express.Router();
category.get('/',verif,categoryController.index);
category.post('/',verif,categoryController.store);
category.patch('/:id',verif,categoryController.update);
category.delete('/',verif,categoryController.destroy);
