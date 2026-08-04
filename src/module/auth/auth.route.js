import express from "express";
import { loginController, registerController } from "./auth.controller.js";
import { loginValidation, registerValidation } from "./auth.validation.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validationMiddleware,
    registerController
 );

 router.post(
    "/Login",
    loginValidation,
    loginController
 )
 
 export default router;