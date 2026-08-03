import bcrypt from "bcrypt";
import { check_email, insert_user } from "./auth.query.js";
import db from "../../config/db.config.js";

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

export { registerService };