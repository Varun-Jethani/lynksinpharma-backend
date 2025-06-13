import { Router } from "express";

import {
        createOrder,
        getUserOrders,
        getAllOrders,
        updateOrderStatus
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/userAuth.middleware.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";


const orderRouter = Router();


orderRouter.route("/")
    .post(verifyJWT, createOrder)
    .get(verifyAdminJWT, getAllOrders);

orderRouter.route("/user")
    .get(verifyJWT, getUserOrders);
    
orderRouter.route("/update-status")
    .post(verifyAdminJWT, updateOrderStatus);

export default orderRouter;
