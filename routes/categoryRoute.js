import express from 'express';
import { getAllCategoriesController, createCategoryController, deleteCategoryController, editCategoryController } from '../controllers/categoryController.js';

const router = express.Router();


// Get all categories 

router.get('/all', getAllCategoriesController);



// Create category should pass the name of the category
// * in the response you will get the category Id  and add that inn the product 

router.post('/create', createCategoryController);



// delete category pass the the category id as params

router.delete('/delete/:id', deleteCategoryController);



// edit category pass the the category id as params

router.put('/edit/:id', editCategoryController);



export default router;