import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "image",
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
});

export const productModel = mongoose.models.product || new mongoose.model('product', productSchema);
