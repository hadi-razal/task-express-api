import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // every name should be unique there would no category with same name 
    }
})


export const categoryModel = mongoose.models.category || new mongoose.model('category', categorySchema)