import { registerService } from "./auth.service.js";

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

export {registerController};