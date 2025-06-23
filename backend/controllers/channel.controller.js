import channelModel from "../models/channel.model.js";
import userModel from "../models/user.model.js";

// POST /channels/create - Create a new channel for an authenticated user
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;// Extract channel details from request body
    const userId = req.user.id; // Get user ID from authenticated request
 // Check if the user already has a channel
    const existingUser = await userModel.findById(userId);
    if (existingUser?.channel) {
      return res.status(400).json({ message: "User already has a channel." });
    }

    let channelAvatar = "";
    let channelBanner = "";
// If avatar file is uploaded, set its path
    if (req.files?.channelAvatar) {
      channelAvatar = req.files.channelAvatar[0].path;
    }
      // If banner file is uploaded, set its path
    if (req.files?.channelBanner) {
      channelBanner = req.files.channelBanner[0].path;
    }
 // Create a new channel document
    const channel = new channelModel({
      channelName,
      channelAvatar,
      description,
      channelBanner,
      owner: userId,
    });
 // Save the channel to the database
    await channel.save();
    // Link the newly created channel to the user
    existingUser.channel = channel._id;
    if (channelAvatar) {
  existingUser.avatarUrl = channelAvatar;
}
    await existingUser.save();
 // Respond with success message and the new channel details
    res.status(201).json({ message: "Channel created successfully", channel });
  } catch (error) {
    console.error("Create Channel Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// GET /channels/:channelId - Get details of a channel by its ID
export const getChannelById = async (req, res) => {
  try {
    const channelId = req.params.channelId; // Get channel ID from route parameter
 // Fetch the channel with populated owner details
    const channel = await channelModel.findById(channelId)
      .populate("owner", "username email")
   // If no channel found, return 404
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
 // Return the channel details
    res.json(channel);
  } catch (error) {
    console.error("Get Channel Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};