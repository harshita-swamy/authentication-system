import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {

        // Read Authorization Header
        const authHeader = req.headers.authorization;

        // Check if Authorization Header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization Header Missing"
            });
        }

        // Extract JWT Token
        const token = authHeader.split(" ")[1];

        // Verify JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store Decoded User Data
        req.user = decoded;

        // Move to Next Middleware / Controller
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });

    }
};

export default authMiddleware; 