import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173","http://localhost:5174",process.env.FRONTEND_URL, process.env.ADMIN_URL],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import contactRouter from "./routes/contact.routes.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.routes.js";
import webRouter from "./routes/web.routes.js";
import CareerRouter from "./routes/career.routes.js";

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/contactus", contactRouter);
app.use("/product", productRouter);
app.use("/order",orderRouter);
app.use("/web", webRouter);
app.use("/career", CareerRouter);

app.use("/", (req, res) => {
  res.json("Hell");
});

export default app;
