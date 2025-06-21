import mongoose from 'mongoose';

// schema for the Video model
const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        thumbnailUrl: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
          // Reference to the channel that owns this video
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            required: true,
        },
          // Reference to the user who uploaded the video
        uploader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        views: {
            type: Number,
            default: 0
        },
         // Array of user IDs who liked the video
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", default: [] }],
        
        // Array of user IDs who disliked the video
        dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" , default: []}],
        category: {
            type: String
        },
        uploadDate: {
            type: Date,
            default: Date.now
        }
    },
      // Automatically includes `createdAt` and `updatedAt` timestamps
    { timestamps: true }
);

// Exporting the Mongoose model
const videoModel = mongoose.model('Video', videoSchema);

export default videoModel;