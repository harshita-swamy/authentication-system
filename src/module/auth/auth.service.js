import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { check_email, getEmail_byID, getProfileQuery, insert_user } from "./auth.query.js";
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

// ================================ LOGIN ===================================

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

// ===============================Profile============================
const getProfileService = async(userID)=>{
    const [result] = await db.execute(getProfileQuery, [userID]);

    return result[0];
    
}

export { registerService,
         loginService,
         getProfileService
     };