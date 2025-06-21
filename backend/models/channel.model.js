import mongoose from "mongoose";

// schema for the channel model
const channelSchema = new mongoose.Schema(
  {
      // Name of the channel (required)
    channelName: {
      type: String,
      required: true,
      trim: true,// Removes leading/trailing whitespace
    },
     // URL to the channel's avatar image
    channelAvatar: {
      type: String,  
      default: "",   // Optional: defaults to an empty string if not provided
    },
     // Reference to the user who owns this channel
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
     // Optional channel description
    description: {
      type: String,
      default: "",
    },
      // URL to the channel banner image
    channelBanner: {
      type: String,
      default: "",
    },
    // Total number of subscribers to the channel
    subscribers: {
      type: Number,
      default: 0,
    }
  },
     // Automatically adds createdAt and updatedAt timestamps
  {
    timestamps: true,
  }
);
// Create and export the Channel model
const channelModel = mongoose.model("Channel", channelSchema);
export default channelModel;
