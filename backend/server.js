// Importing necessary modules
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors';

// Loading environment variables from .env file
dotenv.config()
// Initialize Express server instance
const app = express();
// ------------------ MIDDLEWARES ------------------
// Middleware to parse incoming JSON request bodies
app.use(express.json())
app.use(cors());

// ------------------ DATABASE CONNECTION ------------------
// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
          // Starting the server on the port defined in .env or default to 5000
        app.listen(process.env.PORT||5000, () => {
            console.log(`server listening at port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });