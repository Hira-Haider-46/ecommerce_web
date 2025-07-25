import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.ts';
import upload from '../middleware/multer.ts';
import adminAuth from '../middleware/adminAuth.ts';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name:"image1", maxCount:1}, {name:"image2", maxCount:1}, {name:"image3", maxCount:1}, {name:"image4", maxCount:1}]), addProduct);
productRouter.get('/list', listProduct);
productRouter.delete('/remove', adminAuth, removeProduct);
productRouter.get('/single', singleProduct);

export default productRouter;