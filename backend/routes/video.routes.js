import express from "express";
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/video.controller.js";

const videoRouter = express.Router();

videoRouter.get("/", getAllVideos);
videoRouter.get("/:id", getVideoById);
videoRouter.post("/", createVideo);
videoRouter.put("/:id", updateVideo);
videoRouter.delete("/:id", deleteVideo);

export default videoRouter;
