import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { check_email, getEmail_byID, getProfileQuery, insert_user, updateProfileQuery, update_password, get_password_by_id } from "./auth.query.js";

import db from "../../config/db.config.js";

// ================================REGISTER======================================

const registerService = async (userData) => {
    const { name, email, password, phone } = userData;

    // Check Email
    const [existingUser] = await db.execute(check_email, [email]);

    if (existingUser.length > 0) {
        throw new Error("Email Already Exists");
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert User
    const [result] = await db.execute(insert_user, [
        name,
        email,
        hashPassword,
        phone 
    ]);

    return result;
};

// ======================== LOGIN ==========================

const loginService = async (mydata) =>{
    const {email, password} = mydata;

    // check Email
    const [existingData] = await db.execute(check_email, [email]);
    
    if(existingData.length === 0){
        throw new Error('Invalid Email')
    }

    const user = existingData[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Invalid Password')
    }

    // Generate Token:

    const token = jwt.sign(
        {
            id:user.id,
            email:user.email
        },
        process.env.JWT_SECRET,

        {
            expiresIn: "1d"
        }

    );
    return{
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            phone:user.phone
        }
    };
};

// ======================GET PROFILE ========================
const getProfileService = async(userID)=>{
    const [result] = await db.execute(getProfileQuery, [userID]);

    return result[0];
    
}


// ===================== UPDATE PROFILE ======================
const updateProfileService = async(updateData, userID)=>{
    const {name, phone} = updateData;

    const [result] = await db.execute(updateProfileQuery, [name, phone, userID]);

    return result;
}

// =================== CHANGE PASSWORD ====================

const changePasswordService = async (userData, userId) => {
    const { oldPassword, newPassword } = userData;

    // Get Current Password
    const [result] = await db.execute(get_password_by_id, [userId]);

    const user = result[0];

    // Check Old Password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
 
    if (!isMatch) {
        throw new Error("Old Password is Incorrect");
    }

    // Hash New Password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    // Update Password
    await db.execute(update_password, [
        hashPassword,
        userId
    ]);

    return true;
};


export { registerService,
         loginService,
         getProfileService,
         updateProfileService,
         changePasswordService
     };