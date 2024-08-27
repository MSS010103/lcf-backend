// Controllers/groupController.js
import Group from "../models/Group.js";

export const getUserGroups = async (req, res) => {
  const userId = req.user.userId;

  try {
    const groups = await Group.find({ "members.userId": userId });

    if (!groups || groups.length === 0) {
      return res
        .status(404)
        .json({ message: "No groups found for this user." });
    }

    res.status(200).json({ groups });
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ error: "Server error" });
  }
};
