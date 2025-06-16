import express from "express";
import {
  getAllVideos,
  getVideoById,
  searchVideos,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  getVideosByChannelId,
  uploadVideo
} from "../controllers/video.controller.js";
import upload from "../middlewares/multer.js";
import authenticateUser from "../middlewares/authenticate.js";

const videoRouter = express.Router();

videoRouter.get("/", getAllVideos);
videoRouter.get('/search', searchVideos);

videoRouter.get("/:id", getVideoById);

videoRouter.put("/:id", authenticateUser,updateVideo);
videoRouter.delete("/:id",authenticateUser, deleteVideo);
videoRouter.post("/:id/like",authenticateUser, likeVideo);
videoRouter.post("/:id/dislike", authenticateUser,dislikeVideo);
videoRouter.get("/channel/:id",getVideosByChannelId)
videoRouter.post('/upload',authenticateUser,
  upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'thumbnailFile', maxCount: 1 }
  ]),
  uploadVideo
);

export default videoRouter;
