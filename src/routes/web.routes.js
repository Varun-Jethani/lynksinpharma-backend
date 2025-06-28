import { Router } from "express";
import {verifyAdminJWT} from "../middlewares/adminAuth.middleware.js";
import {
    getWhatWeDo,
    postWhatWeDo,
    updateWhatWeDo,
    deleteWhatWeDo,
    getStats
} from "../controllers/web.controller.js";

const webRouter = Router();

webRouter.route("/whatwedo")
    .get(getWhatWeDo)
    .post(verifyAdminJWT, postWhatWeDo);

webRouter.route("/whatwedo/:id")
    .put(verifyAdminJWT, updateWhatWeDo)
    .delete(verifyAdminJWT, deleteWhatWeDo);

webRouter.route("/stats")
    .get(verifyAdminJWT,getStats);

export default webRouter;
