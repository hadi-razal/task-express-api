import { categoryModel } from "../models/categorySchema.js";

// GET ALL CATEGORY CONTROLLER

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({ message: 'Categories fetched successfully', data: categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// CREATE CATEGORY CONTROLLER

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        // console.log(name)


        const newCategory = new categoryModel({ name: name });
        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully', categoryId: newCategory._id }); //add this id to the product

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// DELETE CATEGORY CONTROLLER

export const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await categoryModel.findByIdAndDelete(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// EDIT CATEGORY CONTROLLER

export const editCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        const updatedCategory = await categoryModel.findByIdAndUpdate(categoryId, { name }, { new: true });
        res.status(200).json({ message: 'Category edited successfully', data: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}