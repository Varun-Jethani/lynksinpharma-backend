import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        Address:{
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        Email: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        CompanyName: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        Message:{
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 500
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        status: {
            type: String,
            enum: ["pending","accepted", "shipped", "delivered"],
            default: "pending"
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;