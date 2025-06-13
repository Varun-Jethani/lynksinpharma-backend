import productModel from "../models/product.model.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
    const { ChemicalName, CatelogNumber, CASNumber, MolecularWeight, inStock } = req.body;
    if (!ChemicalName || !CatelogNumber || !CASNumber || !MolecularWeight) {
        throw new ApiError(400, "All fields are required");
    }

    let imageUrl = "";
    if (req.file) {
        const result = await uploadToCloudinary(req.file.path);
        imageUrl = result.url;
    } else {
        throw new ApiError(400, "Image is required");
    }
    const product = await productModel.create({
        ChemicalName,
        CatelogNumber,
        CASNumber,
        MolecularWeight,
        Image: imageUrl,
        inStock: inStock || true
    });
    if (!product) {
        throw new ApiError(500, "Failed to create product");
    }
    res.status(201).json(new ApiResponse(201, "Product created successfully", product));
});
const getProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find().sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, "Products retrieved successfully", products));
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    res.status(200).json(new ApiResponse(200, "Product retrieved successfully", product));
});

const updateProduct = asyncHandler(async (req, res) => {
    const { ChemicalName, CatelogNumber, CASNumber, MolecularWeight, inStock } = req.body;
    if (!ChemicalName || !CatelogNumber || !CASNumber || !MolecularWeight) {
        throw new ApiError(400, "All fields are required");
    }
    const product = await productModel.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    let imageUrl = product.Image;
    if (req.file) {
        const result = await uploadToCloudinary(req.file.path);
        imageUrl = result.url;
    }
    product.ChemicalName = ChemicalName;
    product.CatelogNumber = CatelogNumber;
    product.CASNumber = CASNumber;
    product.MolecularWeight = MolecularWeight;
    product.Image = imageUrl;
    product.inStock = inStock || true;

    await product.save();
    res.status(200).json(new ApiResponse(200,"Product updated successfully", product));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
});

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};