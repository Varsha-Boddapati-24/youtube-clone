import channelModel from "../models/channel.model.js";
import userModel from "../models/user.model.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    const userId = req.user.id;

    const existingUser = await userModel.findById(userId); 
    if (existingUser?.channel) {
      return res.status(400).json({ message: "User already has a channel." });
    }

    const channel = new channelModel({
      channelName,
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
