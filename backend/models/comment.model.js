import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', index: true },
  userId:  { type: Schema.Types.ObjectId, ref: 'User' },
  text:    String,
  timestamp: { type: Date, default: Date.now },
});
const commentModel= mongoose.model('Comment', commentSchema)
export default commentModel