import { Router } from "express";

import {
        createOrder,
        getUserOrders,
        getAllOrders,
        updateOrderStatus,
        updateOrderTrackingURL
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

orderRouter.route("/update-tracking")
    .post(verifyAdminJWT, updateOrderTrackingURL);

export default orderRouter;
