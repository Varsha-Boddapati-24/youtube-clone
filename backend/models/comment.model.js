import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  text:    String,
  timestamp: { type: Date, default: Date.now },
});
const commentModel= mongoose.model('Comment', commentSchema)
export default commentModel