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
