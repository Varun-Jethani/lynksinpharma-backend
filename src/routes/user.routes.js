import { Router } from "express";

import { verifyJWT } from "../middlewares/userAuth.middleware.js";

import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
  validateToken,
  verifyEmailOTP,
  sendOTPAgain,
  addproducttoCart,
  removeproductfromCart,
  updateproductQuantityInCart,
  getCart,
  addSearchHistory,
  getSearchHistory
} from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

userRouter.route("/profile").get(verifyJWT, userProfile);
userRouter.route("/verifyOTP").post(verifyEmailOTP);
userRouter.route("/sendOTP").post(sendOTPAgain);
userRouter.route("/cart").get(verifyJWT, getCart);
userRouter.route("/cart/remove/:id").delete(verifyJWT, removeproductfromCart);
userRouter.route("/cart/add").post(verifyJWT, addproducttoCart);

userRouter.route("/cart/update").post(verifyJWT, updateproductQuantityInCart);
userRouter.route("/search/history").post(verifyJWT, addSearchHistory);
userRouter.route("/search/history").get(verifyJWT, getSearchHistory);

export default userRouter;
