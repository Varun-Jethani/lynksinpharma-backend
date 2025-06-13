import { Router } from "express";

import  {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";
const productRouter = Router();
productRouter.route("/")
    .post(verifyAdminJWT, upload.single("Image"), createProduct)
    .get(getProducts);

productRouter.route("/:id")
    .get(getProductById)
    .put(verifyAdminJWT, upload.single("Image"), updateProduct)
    .delete(verifyAdminJWT, deleteProduct);

export default productRouter;
