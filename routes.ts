import express from 'express';
import { addImage } from './controllers/addImage';
import { createProductPost, filterProducts } from './controllers/createProduct';
import { createCategory } from './controllers/createCategory';
import { deleteCategory } from './controllers/deleteCategory';
import { deleteProduct } from './controllers/deleteProduct';
import { deleteProductFromCategory } from './controllers/delProductFromCategory';
import { updateProduct } from './controllers/updateProduct';
import { updateCategory } from './controllers/updateCategory';
import { upload } from './config/multer';
import { convert } from './controllers/convertImage';

const route = express.Router();

route.get('/product', filterProducts);
route.post('/product', upload.single('file'), addImage, createProductPost);
route.put('/product/:id', updateProduct);
route.delete('/product/:id', deleteProduct);

route.post('/category', createCategory);
route.put('/category/:id', updateCategory);
route.delete('/category/:id', deleteCategory);
route.delete('/category/products/:id', deleteProductFromCategory);

route.get('/image/:id', convert);
route.post('/image', upload.single('file'), addImage);

export { route };
