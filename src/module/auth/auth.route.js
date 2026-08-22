import express from "express";
import { getProfileController, loginController, registerController, updateProfileController } from "./auth.controller.js";
import { loginValidation, registerValidation } from "./auth.validation.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

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
    validationMiddleware,
    loginController
 )

 router.get(
   "/profile",
   authMiddleware,
   getProfileController
 )

 router.put(
   "/updateProfile",
   authMiddleware,
   updateProfileController
 )



 export default router;