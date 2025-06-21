// Import the User model to interact with the database
import UserModel from "../models/user.model.js";
// Import JWT for creating authentication tokens
import jwt from "jsonwebtoken";
// Import bcrypt for hashing and comparing passwords
import bcrypt from "bcryptjs"
// Import dotenv to load environment variables (like JWT_SECRET)
import dotenv from "dotenv"
// Load .env file contents into process.env
dotenv.config();

// ------------------ REGISTER USER ------------------
export const registerUser = async (req, res) => {
    try {
        //Extract user details from request body
        const { username, email, password } = req.body;
        // regex pattern to validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            // If email doesn't match pattern, return 400 Bad Request
            return res.status(400).json({ error: "Invalid email format" });
        }
        // Check if user already exists with the same email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            // If user exists, return 409
            return res.status(409).json({ error: "User already exists" });
        }
        // Hash the password using bcrypt with 10 salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user document and save to DB
        const newUser = await UserModel.create({ username, email, password: hashedPassword });
        // Return success response with newly created user's ID
        res.status(201).json({ message: "Registration successful", userId: newUser._id });
    } catch (err) {
        // Log and handle any unexpected errors
        console.error("Register Error:", err);
        res.status(500).json({ error: "Registration failed" });
    }
};
// ------------------ LOGIN USER ------------------
export const loginUser = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { email, password } = req.body;
        // Find user with the provided email
        const user = await UserModel.findOne({ email });
        // If user not found, return 401 Unauthorized
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        // Compare input password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        // If password doesn't match, return 401 Unauthorized
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
        // Generate JWT token with user ID and 1-hour expiration
        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        // Return success message along with the token
        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({
                message: "Login successful",
            });

    } catch (err) {
        // handle any unexpected errors
        console.error("Login Error:", err);
        res.status(500).json({ error: "Login failed" });
    }
};
// POST /user/signout - Clear auth token cookie and logout user

export const signoutUser = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Logout Error:", err);
        res.status(500).json({ error: "Logout failed" });
    }
};
// GET /user - Get authenticated user details (excluding password)
export const getUser = async (req, res) => {
    try {

        const userId = req.user.id
        // Fetch user by ID, exclude password field using projection
        const user = await UserModel.findById(userId, { password: 0 });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send back user details except password
        res.status(200).json({
            user
        });
    } catch (err) {
        console.error("Get User Error:", err);
        res.status(500).json({ error: "Failed to get user" });
    }
};

