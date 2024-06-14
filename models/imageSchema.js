import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    path: [{ type: String, required: false }]
});

export const imageModel = mongoose.models.image || new mongoose.model('image', imageSchema);