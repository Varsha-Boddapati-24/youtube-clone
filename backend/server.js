// Importing necessary modules
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors';
import userRouter from "./routes/user.routes.js";
import channelRouter from "./routes/channel.routes.js"
import cookieParser from 'cookie-parser';
import videoRouter from "./routes/video.routes.js";



// Loading environment variables from .env file
dotenv.config()
// Initialize Express server instance
const app = express();
// ------------------ MIDDLEWARES ------------------
// Middleware to parse incoming JSON request bodies
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));
app.use(cookieParser());


// ------------------ ROUTE MOUNTING ------------------
// Route handler for user registration and login
app.use("/user", userRouter)
app.use("/channels", channelRouter);
app.use("/videos",videoRouter)

// ------------------ DATABASE CONNECTION ------------------
// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        // Starting the server on the port defined in .env or default to 5000
        app.listen(process.env.PORT || 5000, () => {
            console.log(`server listening at port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });