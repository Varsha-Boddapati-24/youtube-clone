import commentModel from "../models/comment.model.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const newComment = new commentModel(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: "Error adding comment", error: err.message });
  }
};

// Edit Comment
export const editComment = async (req, res) => {
  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true}
    );
    if (!updatedComment) return res.status(404).json({ message: "Comment not found" });
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: "Error updating comment", error: err.message });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const deleted = await commentModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err.message });
  }
};

// Get all comments for a video
export const getCommentsByVideoId = async (req, res) => {
  try {
    const comments = await commentModel.find({ videoId: req.params.videoId })
      .populate('userId', 'username');
      console.log("comments",comments)
    // if (comments.length === 0) return res.status(404).json({ message: "Comments not found" });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};
