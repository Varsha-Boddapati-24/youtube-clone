import commentModel from "../models/comment.model.js";

// POST /comments - Add a new comment to a video
export const addComment = async (req, res) => {
  try {
    const newComment = new commentModel(req.body);
    const savedComment = await newComment.save();
     const populatedComment = await savedComment.populate('userId', 'username');
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(400).json({ message: "Error adding comment", error: err.message });
  }
};

// PUT /comments/:id - Edit an existing comment by its ID
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

// DELETE /comments/:id - Delete a comment by its ID
export const deleteComment = async (req, res) => {
  try {
    const deleted = await commentModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Comment not found" });
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err.message });
  }
};

// GET /comments/video/:videoId - Fetch all comments for a specific video
export const getCommentsByVideoId = async (req, res) => {
  try {
    const comments = await commentModel.find({ videoId: req.params.videoId })
      .populate('userId', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};
