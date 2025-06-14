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
    .populate('channelId', 'channelName')
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
      .populate('channelId', 'channelName')
      .populate('uploader', 'username');

    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error fetching video", error: err.message });
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
// POST /videos - create a new video
export const createVideo = async (req, res) => {
  try {
    const newVideo = new videoModel(req.body);
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(400).json({ message: "Error creating video", error: err.message });
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

