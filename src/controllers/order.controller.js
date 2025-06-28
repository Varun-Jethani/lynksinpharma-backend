import OrderModel from "../models/order.model.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { ApiError } from "../utils/ApiError.js";
import sendEmail from "../utils/Emailer.js";

const createOrder = asyncHandler(async (req, res) => {
    const {products, name, Address, phone, Email, CompanyName, Message} = req.body;
    if (!products || products.length === 0) {
        throw new ApiError(400, "Products are required to create an order");
    }
    if (!name || !Address || !phone || !Email) {
        throw new ApiError(400, "Name, Address, phone, and Email are required");
    }
    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        throw new ApiError(400, "Invalid phone number format. It should be 10 digits long.");
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        throw new ApiError(400, "Invalid email format");
    }

    // name and address length validation
    if (name.length < 2 || name.length > 100) {
        throw new ApiError(400, "Name must be between 2 and 100 characters");
    }
    if (Address.length < 5 || Address.length > 255) {
        throw new ApiError(400, "Address must be between 5 and 255 characters");
    }
    if (CompanyName && (CompanyName.length < 2 || CompanyName.length > 100)) {
        throw new ApiError(400, "Company Name must be between 2 and 100 characters");
    }
    if (Message && (Message.length < 5 || Message.length > 500)) {
        throw new ApiError(400, "Message must be between 5 and 500 characters");
    }   

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "User not authenticated");
    }

    const order = await OrderModel.create({
        user: req.user._id,
        products,
        status: "pending",
        name,
        Address,
        phone,
        Email,
        CompanyName,
        Message
    });
    if (!order) {
        throw new ApiError(500, "Failed to create order");
    }
    // Send email notification to user
    await sendEmail({
        to: req.user.email,
        subject: "Order Confirmation",
        text: `Your order with ID ${order._id} has been created successfully.`,
        html: `<p>Your order with ID <strong>${order._id}</strong> has been created successfully.</p>`
    });
    res.status(201).json(new ApiResponse(201,"Order Placed Successfully", order));
})

const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find({ user: req.user._id })
        .populate("products.product", "name price image")
        .sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200,"User Orders retrieved Successfully",orders));
});

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find()
        .populate("user", "name email")
        .populate("products.product", "ChemicalName CASNumber CatelogNumber Image")
        .sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, "Orders retrieved successfully", orders));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
        throw new ApiError(400, "Order ID and status are required");
    }
    const order = await OrderModel.findById(orderId).populate("user", "name email");
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    order.status = status;
    await order.save();

    // Send email notification to user
    await sendEmail({
        to: order.user.email,
        subject: "Order Status Update",
        text: `Your order with ID ${order._id} has been updated to ${status}.`,
        html: `<p>Your order with ID <strong>${order._id}</strong> has been updated to <strong>${status}</strong>.</p>`
    });

    res.status(200).json(new ApiResponse(200,"Order status updated successfully", order));
});

const updateOrderTrackingURL = asyncHandler(async (req, res) => {
    const { orderId, trackingURL } = req.body;
    if (!orderId || !trackingURL) {
        throw new ApiError(400, "Order ID and tracking URL are required");
    }
    const order = await OrderModel.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }
    order.trackingURL = trackingURL;
    await order.save();
    res.status(200).json(new ApiResponse(200, "Order tracking URL updated successfully", order));
});


export {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    updateOrderTrackingURL
};