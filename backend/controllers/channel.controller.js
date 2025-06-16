import channelModel from "../models/channel.model.js";
import userModel from "../models/user.model.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;
    const userId = req.user.id;

    const existingUser = await userModel.findById(userId);
    if (existingUser?.channel) {
      return res.status(400).json({ message: "User already has a channel." });
    }

    let channelAvatar = "";
    let channelBanner = "";

    if (req.files?.channelAvatar) {
      channelAvatar = req.files.channelAvatar[0].path;
    }
    if (req.files?.channelBanner) {
      channelBanner = req.files.channelBanner[0].path;
    }

    const channel = new channelModel({
      channelName,
      channelAvatar,
      description,
      channelBanner,
      owner: userId,
    });

    await channel.save();
    existingUser.channel = channel._id;
    await existingUser.save();

    res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    console.error("Create Channel Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channelId = req.params.channelId;

    const channel = await channelModel.findById(channelId)
      .populate("owner", "username email")

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    console.error("Get Channel Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};