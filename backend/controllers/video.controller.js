import channelModel from "../models/channel.model.js";
import videoModel from "../models/video.model.js";  


// GET /videos - fetch all videos
export const getAllVideos = async (req, res) => {
  try {
     const { category } = req.query; 

    let query = {};
    if (category && category !== "All") {
      query.category = category;  
    }
    
    const videos = await videoModel.find(query)
    .populate('channelId', 'channelName channelAvatar')
      .populate('uploader', 'username');
// console.log("videos",video[0])
    res.json(videos);
  } catch (err) {
    console.log(err)
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
  console.log("id",id)

    // all videos that belong to this channel
    const videos = await videoModel.find({ channelId: id });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos by channelId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;
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



export const likeVideo = async (req, res) => {
  const videoId = req.params.id;
  const userId = req.user.id; // From auth middleware

  const video = await videoModel.findById(videoId);

  if (!video) return res.status(404).json({ message: "Video not found" });

  // If already liked, remove like (toggle)
  if (video.likes.includes(userId)) {
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


// Dislike controller
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

export const uploadVideo = async (req, res) => {
  try {
    const { channelId, title, description, category } = req.body;

    // Verify channel exists
    const channel = await channelModel.findById(channelId);
    if (!channel) {
      return res.status(400).json({ message: "Channel not found" });
    }

    // Extract file urls from multer output
    const videoUrl = req.files.videoFile[0].path;
    const thumbnailUrl = req.files.thumbnailFile[0].path;

    // Create video document in DB
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
