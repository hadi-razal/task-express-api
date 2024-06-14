import express from 'express';
import { getAllProductsController, createProductController, deleteProductController, editProductController, getSingleProductController } from '../controllers/productController.js';

const router = express.Router();


// get prodcut will also populate the image and category

router.get('/all', getAllProductsController);



// get single product pass the ids as params image and category will be populated

router.get('/single-product/:id', getSingleProductController);



// should pass the image id and category id  and item and price

router.post('/create', createProductController);



// product delete pass the product id in the params

router.delete('/delete/:id', deleteProductController);



// product edit pass the product id in the params

router.put('/edit/:id', editProductController);



export default router;