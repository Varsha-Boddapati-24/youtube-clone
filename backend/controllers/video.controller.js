import channelModel from "../models/channel.model.js";
import videoModel from "../models/video.model.js";  


// GET /videos - Fetch all videos with optional category filter and pagination

export const getAllVideos = async (req, res) => {
  try {
     // Build query only if specific category (other than "All") is selected
    const { category, page = 1, limit = 10 } = req.query;
    const query = category && category !== "All" ? { category } : {};
// Fetch videos with pagination and populate related info
    const videos = await videoModel.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean()
      .populate('channelId', 'channelName channelAvatar')
      .populate('uploader', 'username');
 // Get total count of videos for pagination logic
    const total = await videoModel.countDocuments(query);

    res.json({
      videos,
      hasMore: page * limit < total,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos", error: err.message });
  }
};


// GET /videos/:id - fetch a single video
export const getVideoById = async (req, res) => {
  try {

    const video = await videoModel.findById(req.params.id)
      .populate('channelId', 'channelName channelAvatar')
      .populate('uploader', 'username');
    

    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error fetching video", error: err.message });
  }
};

//GET/videos/channel/:id - fetch a videos of that specific channel
export const getVideosByChannelId = async (req, res) => {
  try {
    const { id } = req.params;

  // Find all videos where channelId matches the given id
    const videos = await videoModel.find({ channelId: id });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos by channelId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//GET /videos/search?query=... - Search videos by title using regex

export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;
     // Use regex to perform case-insensitive title search
    const videos = await videoModel.find({
      title: { $regex: query, $options: "i" } 
    }).populate('channelId', 'channelName').populate('uploader', 'username');

    res.json(videos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error searching videos", error: err.message });
  }
};


// PUT /videos/:id - update video
export const updateVideo = async (req, res) => {
  try {
    const updatedVideo = await videoModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedVideo) return res.status(404).json({ message: "Video not found" });
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: "Error updating video", error: err.message });
  }
};

// DELETE /videos/:id - delete video
export const deleteVideo = async (req, res) => {
  try {
    const deleted = await videoModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting video", error: err.message });
  }
};


// POST /videos/:id/like - Like a video or toggle like if already liked
export const likeVideo = async (req, res) => {
  const videoId = req.params.id;
  const userId = req.user.id; // From auth middleware

  const video = await videoModel.findById(videoId);

  if (!video) return res.status(404).json({ message: "Video not found" });

  // If already liked, remove like (toggle)
  if (video.likes.includes(userId)) {
     // If already liked, remove like (toggle off)
    video.likes.pull(userId);
  } else {
    video.likes.push(userId);
    // Remove from dislikes if previously disliked
    video.dislikes.pull(userId);
  }

  await video.save();
  res.json({
    likes: video.likes,
    dislikes: video.dislikes
  });
};

//POST /videos/:id/dislike - Dislike a video or toggle dislike if already disliked
export const dislikeVideo = async (req, res) => {
  const videoId = req.params.id;
  const userId = req.user.id;

  const video = await videoModel.findById(videoId);
  if (!video) return res.status(404).json({ message: "Video not found" });

  if (video.dislikes.includes(userId)) {
    video.dislikes.pull(userId);
  } else {
    video.dislikes.push(userId);
    video.likes.pull(userId);
  }

  await video.save();
  res.json({
    likes: video.likes,
    dislikes: video.dislikes
  });
};
// POST /videos/upload - Upload a new video (with file + metadata)
export const uploadVideo = async (req, res) => {
  try {
    const { channelId, title, description, category } = req.body;
    const channel = await channelModel.findById(channelId);
     // Check if the provided channel ID exists
    if (!channel) {
      return res.status(400).json({ message: "Channel not found" });
    }

   // Extract uploaded file paths from multer's req.files
    const videoUrl = req.files.videoFile[0].path;
    const thumbnailUrl = req.files.thumbnailFile[0].path;

    // Create new video document with metadata and file paths
    const newVideo = await videoModel.create({
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
       channelId,
      uploader: req.user.id,  
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
