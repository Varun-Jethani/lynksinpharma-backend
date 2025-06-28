import WhatWeDoModel from "../models/whatwedo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiresponse.js";
import asyncHandler from "express-async-handler";
import productModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import ContactModel from "../models/contact.model.js";

const getWhatWeDo = asyncHandler(async (req, res) => {
    const whatWeDo = await WhatWeDoModel.find();
    if (!whatWeDo || whatWeDo.length === 0) {
        throw new ApiError(404, "What We Do not found");
    }
    res.status(200).json(new ApiResponse(200, whatWeDo, "What We Do fetched successfully"));
}
);

const postWhatWeDo = asyncHandler(async (req, res) => {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
        throw new ApiError(400, "All fields are required");
    }

    const newWhatWeDo = await WhatWeDoModel.create({
        title,
        description,
        image
    });

    if (!newWhatWeDo) {
        throw new ApiError(500, "Failed to create What We Do");
    }

    res.status(201).json(new ApiResponse(201, "What We Do created successfully", newWhatWeDo));
});

const updateWhatWeDo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
        throw new ApiError(400, "All fields are required");
    }

    const updatedWhatWeDo = await WhatWeDoModel.findByIdAndUpdate(id, {
        title,
        description,
        image
    }, { new: true });

    if (!updatedWhatWeDo) {
        throw new ApiError(404, "What We Do not found");
    }

    res.status(200).json(new ApiResponse(200,updatedWhatWeDo, "What We Do updated successfully"));
});
const deleteWhatWeDo = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedWhatWeDo = await WhatWeDoModel.findByIdAndDelete(id);
    if (!deletedWhatWeDo) {
        throw new ApiError(404, "What We Do not found");
    }
    res.status(200).json(new ApiResponse(200, "What We Do deleted successfully"));
});

const getStats = asyncHandler(async (req, res) => {
    const totalProducts = await productModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const totalContacts = await ContactModel.countDocuments();

    res.status(200).json(new ApiResponse(200, "Statistics fetched successfully", {
        totalProducts,
        totalOrders,
        totalUsers,
        totalContacts
    }));
});
