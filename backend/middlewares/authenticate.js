import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
// Middleware to authenticate user using JWT
function authenticateUser(req, res, next) {
const authHeader = req.headers.authorization;
  
 const token = req.cookies.token||authHeader && authHeader.split(" ")[1];;
    // If no token found, return unauthorized response
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    // Verify the token using the JWT secret
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token has expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(403).json({ error: "Token is invalid" });
            } else {
                // Rare/unexpected error
                console.error("Unexpected JWT error:", err);
                return res.status(403).json({ error: "Authentication failed" });
            }
        }
        // Token is valid, attach decoded user info to request object
        req.user = decodedUser;
        // Proceed to the next middleware or controller
        next();
    });
}

export default authenticateUser;
