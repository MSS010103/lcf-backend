// controllers/communityController.js
import Community from "../models/Community.js";

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
