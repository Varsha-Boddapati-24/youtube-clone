import express from "express";
import { createChannel ,getChannelById} from "../controllers/channel.controller.js";
import authenticateUser from "../middlewares/authenticate.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

// @route   POST /channels/create - Create a new channel (requires auth)
router.post(
  "/create",
  authenticateUser,
  upload.fields([
    { name: "channelAvatar", maxCount: 1 },
    { name: "channelBanner", maxCount: 1 }
  ]),
  createChannel
);
// @route   GET /channels/:channelId - Get channel details by ID
router.get("/:channelId", getChannelById);

export default router;
