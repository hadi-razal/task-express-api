import { imageModel } from "../models/imageSchema.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';



// ADD IMAGE CONTROLLER

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});


const upload = multer({ storage: storage }).array('images', 10);

// max you can upload upto 10 images at a time


// Controller to handle file upload and save the paths in MongoDB
export const addProductImageController = async (req, res) => {
    try {
        // Handle file upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed', error: err.message });
            }

            const imageFiles = req.files;

            if (!imageFiles || imageFiles.length === 0) {
                return res.status(400).json({ message: 'No image files provided' });
            }

            // Create new image documents with the file paths
            const newImages = imageFiles.map(file => ({ path: `http://localhost:3001/profile/${file.path}` }));

            // Save the new images to the database by mapping their paths from newImages
            const image = await imageModel.create({
                path: newImages.map(image => image.path)
            });

            res.status(201).json({ message: 'Product images added successfully', imageId: image._id }); //this id is added to the product
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// EDIT IMAGE CONTROLLER

export const editProductImageController = async (req, res) => {
    try {
        const imageId = req.params.id;

        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed', error: err.message });
            }

            const imageFiles = req.files;

            if (!imageFiles || imageFiles.length === 0) {
                return res.status(400).json({ message: 'No image files provided' });
            }

            // Create new image documents with the file paths
            const newImages = imageFiles.map(file => ({ path: `http://localhost:3001/profile/${file.filename}` }));

            // Update the image paths in the database
            const updatedImage = await imageModel.findByIdAndUpdate(
                imageId,
                { path: newImages.map(image => image.path) },
                { new: true }
            );

            if (!updatedImage) {
                return res.status(404).json({ message: 'Image not found' });
            }

            res.status(200).json({ message: "Image updated successfully", data: updatedImage });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




// GET PRODUCT IMAGE BY ID CONTROLLER

export const getProductImageController = async (req, res) => {
    try {
        const imageId = req.params.id;

        const image = await imageModel.findById(imageId);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




// DELETE IMAGE CONTROLLER

export const deleteProductImageController = async (req, res) => {
    try {
        const imageId = req.params.id;
        await imageModel.findByIdAndDelete(imageId);
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}