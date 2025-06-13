import express from "express";
import {
  getAllVideos,
  getVideoById,
  searchVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/video.controller.js";
import authenticateUser from "../middlewares/authenticate.js";

const videoRouter = express.Router();

videoRouter.get("/", getAllVideos);
videoRouter.get('/search', searchVideos);

videoRouter.get("/:id", getVideoById);
videoRouter.post("/",authenticateUser, createVideo);
videoRouter.put("/:id", authenticateUser,updateVideo);
videoRouter.delete("/:id",authenticateUser, deleteVideo);

export default videoRouter;
