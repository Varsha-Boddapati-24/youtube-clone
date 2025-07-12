// Importing necessary modules
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors';
import userRouter from "./routes/user.routes.js";
import channelRouter from "./routes/channel.routes.js"
import cookieParser from 'cookie-parser';
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import userModel from "./models/user.model.js";
import channelModel from "./models/channel.model.js";
import videoModel from "./models/video.model.js";
import seed from "./utils/seed.js";
import logger from "./middlewares/logger.js";


// Loading environment variables from .env file
dotenv.config()
// Initialize Express server instance
const app = express();
// ------------------ MIDDLEWARES ------------------
// Middleware to parse incoming JSON request bodies
app.use(express.json({ limit: '10mb' }))
// Custom middleware to log incoming requests (timestamp, method, path)
app.use(logger);
// Enable CORS for frontend at localhost:5173 with credentials like cookies
app.use(cors(
    {
        origin: 'https://yt-clone-vb24.netlify.app',
        credentials: true,
    }
));
// Middleware to parse cookies from incoming requests
app.use(cookieParser());


// ------------------ ROUTE MOUNTING ------------------
// Route handler for user registration and login
app.use("/user", userRouter)
app.use("/channels", channelRouter);
app.use("/videos",videoRouter)
app.use("/comments",commentRouter)

// ------------------ DATABASE CONNECTION ------------------
// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
 .then(async () => {
    console.log("Connected to MongoDB");

    //  Seed only if empty
    const userCount = await userModel.countDocuments();
    const channelCount = await channelModel.countDocuments();
    const videoCount = await videoModel.countDocuments();

    if (userCount === 0 && channelCount === 0 && videoCount === 0) {
      console.log(" Seeding initial data...");
      await seed(); // run seeding logic only if all are empty
    }

    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server listening on port ${process.env.PORT || 5000}`);
    });
  })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });