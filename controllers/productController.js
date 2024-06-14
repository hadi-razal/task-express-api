
import { productModel } from "../models/productSchema.js";



// CREATE PRODUCT CONTROLLER

export const createProductController = async (req, res) => {
    try {
        const { item, price, image: imageId, category: categoryId } = req.body;

        if (!item || !price || !imageId || !categoryId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newProduct = new productModel({ item, price, image: imageId, category: categoryId });
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', data: newProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// GET ALL PRODUCTS CONTROLLER

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find().populate('category').populate('image');
        if (products.length === 0) {
            return res.status(200).json({ message: 'No products found' });
        }
        res.status(200).json({ message: 'Products fetched successfully', data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




// GET SINGLE PRODUCT BY ID CONTROLLER

export const getSingleProductController = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId).populate('category').populate('image');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: 'Product fetched successfully', data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// EDIT PRODUCT CONTROLLER


export const editProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const { item, price, image, category } = req.body;

        const updatedProduct = await productModel.findByIdAndUpdate(productId, { item, price, image, category }, { new: true });
        res.status(200).json({ message: 'Product edited successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




// DELETE PRODUCT CONTROLLER

export const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        await productModel.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




