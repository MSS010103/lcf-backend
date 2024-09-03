// controllers/communityController.js
import Community from "../models/Community.js";
import Profile from "../models/Profile.js";
export const getCommunityMembers = async (req, res) => {
  try {
    const { industry } = req.params;
    const community = await Community.findOne({ industry }).populate(
      "members",
      "fullName username profileImage"
    );

    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    res.status(200).json({ members: community.members });
  } catch (error) {
    console.error("Error fetching community members:", error);
    res
      .status(500)
      .json({
        message: "Error retrieving community data. Please try again later.",
      });
  }
};

import Community from "../models/Community.js";

// Get chat messages for a specific community
export const getCommunityChat = async (req, res) => {
  try {
    const { industry } = req.params;
    const community = await Community.findOne({ industry }).populate("chat");

    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    res.status(200).json({ messages: community.chat });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res
      .status(500)
      .json({
        message: "Error retrieving chat messages. Please try again later.",
      });
  }
};

// Post a new message to a community chat
export const postCommunityChat = async (req, res) => {
  try {
    const { industry } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    const community = await Community.findOne({ industry });

    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    const newMessage = {
      sender: userId,
      text: message,
      createdAt: new Date(),
    };

    community.chat.push(newMessage);
    await community.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error posting chat message:", error);
    res
      .status(500)
      .json({ message: "Error posting chat message. Please try again later." });
  }
};

