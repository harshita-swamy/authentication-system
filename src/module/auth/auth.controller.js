import { loginService, registerService } from "./auth.service.js";

// ==================== REGISTER CONTROLLER ======================
const registerController = async(req, res)=>{
    try {
        const result = await registerService(req.body);

        return res.status(201).json({
            success: true,
            messgae: "User Registered Successfully",
            data: result
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            messgae: error.messgae
        })
    }
}

// ==================== LOGIN CONTROLLER ========================
const loginController = async(req, res) => {
    try {
        const result = await loginService(req.body);

        return res.status(201).json({
            success:true,
            message:'Login Successfully',
            data:result
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export {
    registerController, 
    loginController
};
