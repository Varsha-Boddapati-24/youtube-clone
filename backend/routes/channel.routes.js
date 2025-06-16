import express from "express";
import { createChannel ,getChannelById} from "../controllers/channel.controller.js";
import authenticateUser from "../middlewares/authenticate.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post(
  "/create",
  authenticateUser,
  upload.fields([
    { name: "channelAvatar", maxCount: 1 },
    { name: "channelBanner", maxCount: 1 }
  ]),
  createChannel
);

router.get("/:channelId", getChannelById);

export default router;
