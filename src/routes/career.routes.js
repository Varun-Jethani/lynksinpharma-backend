import { Router } from "express";

import {
    getCareers,
    postCareer,
    updateCareer,
    deleteCareer
} from "../controllers/career.controller.js";

const CareerRouter = Router();

CareerRouter.get("/", getCareers);
CareerRouter.post("/", postCareer);
CareerRouter.put("/:id", updateCareer);
CareerRouter.delete("/:id", deleteCareer);

export default CareerRouter;
