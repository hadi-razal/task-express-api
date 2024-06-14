import express from 'express';

import { addProductImageController, getProductImageController, editProductImageController, deleteProductImageController } from '../controllers/imageController.js';

const router = express.Router();


// image will be saved into local and the path is saved in the database
// * in the response you will get the image Id  and add that inn the product 

router.post('/add', addProductImageController);



// PAss the images id as params which is available in the product if not availble then use the /add  api

router.post('/edit/:id', editProductImageController);



//response will return the product also will get the populated the images and category 

router.get('/:id', getProductImageController);



//delete images from the database pass the id as params

router.delete('/delete/:id', deleteProductImageController);



export default router;