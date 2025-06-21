import mongoose from 'mongoose';

// schema for the comment model
const commentSchema = new mongoose.Schema({
  // Reference to the video this comment is associated with
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
  // Reference to the user who posted the comment
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    // The comment text
  text:    String,
    // Timestamp for when the comment was created
  timestamp: { type: Date, default: Date.now },
});
// Create and export the Comment model
const commentModel= mongoose.model('Comment', commentSchema)
export default commentModel