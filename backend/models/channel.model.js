import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      trim: true,
    },
    
    channelAvatar: {
      type: String,  
      default: "",   
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    description: {
      type: String,
      default: "",
    },
    channelBanner: {
      type: String,
      default: "",
    },
    subscribers: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const channelModel = mongoose.model("Channel", channelSchema);
export default channelModel;
