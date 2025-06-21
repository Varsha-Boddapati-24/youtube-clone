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

// @route   GET /videos - Get all videos
videoRouter.get("/", getAllVideos);
// @route   GET /videos/search?q=... - Search videos by query
videoRouter.get('/search', searchVideos);
// @route   GET /videos/:id - Get single video by ID
videoRouter.get("/:id", getVideoById);
// @route   PUT /videos/:id - Update video (auth required)
videoRouter.put("/:id", authenticateUser,updateVideo);
// @route   DELETE /videos/:id - Delete video (auth required)
videoRouter.delete("/:id",authenticateUser, deleteVideo);
// @route   POST /videos/:id/like - Like a video (auth required)
videoRouter.post("/:id/like",authenticateUser, likeVideo);
// @route   POST /videos/:id/dislike - Dislike a video (auth required)
videoRouter.post("/:id/dislike", authenticateUser,dislikeVideo);
// @route   GET /videos/channel/:id - Get all videos by channel ID
videoRouter.get("/channel/:id",getVideosByChannelId)
// @route   POST /videos/upload - Upload a new video (auth required)
videoRouter.post('/upload',authenticateUser,
  upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'thumbnailFile', maxCount: 1 }
  ]),
  uploadVideo
);

export default videoRouter;
