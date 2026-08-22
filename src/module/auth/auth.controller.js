import { getProfileService, loginService, registerService, updateProfileService } from "./auth.service.js";

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

// ==================== PROFILE FETCH CONTROLLER ========================

const getProfileController = async(req, res) =>{
    try {
        const result  = await getProfileService(req.user.id);

        return res.status(200).json({
            success:true,
            message:'Profile Fetched Successfully',
            data:result
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// ===================== UPDATE PROFILE CONTROLLER ==========================

const updateProfileController = async (req, res) => {
    try {
        const result = await updateProfileService(
            req.body,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export {
    registerController, 
    loginController,
    getProfileController,
    updateProfileController
};
