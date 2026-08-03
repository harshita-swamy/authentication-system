import express from "express";
import { registerController } from "./auth.controller.js";
import { registerValidation } from "./auth.validation.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validationMiddleware,
    registerController
 );

 export default router;