import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    ChemicalName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    CatelogNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 50,
    },
    CASNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 50,
    },
    MolecularWeight: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000,
    },
    Image: {
        type: String,
        required: true,
        trim: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true })

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;