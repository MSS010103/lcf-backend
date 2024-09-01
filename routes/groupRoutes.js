// Routes/groupRoutes.js
import express from "express";
import { getUserGroups } from "../controllers/groupController.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

// GET /api/groups - Get all groups for the logged-in user
router.get("/", authenticateToken, getUserGroups);

// Check if the user is a member of the group
router.get("/checkMembership/:concept", isAuthenticated, async (req, res) => {
  try {
    const groupName = req.params.concept;
    const userId = req.user._id;

    const group = await Group.findOne({ name: groupName });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isMember = group.members.includes(userId);
    res.json({ isMember });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Join the group
router.post("/join/:concept", isAuthenticated, async (req, res) => {
  try {
    const groupName = req.params.concept;
    const userId = req.user._id;

    let group = await Group.findOne({ name: groupName });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "You are already a member of this group" });
    }

    group.members.push(userId);
    await group.save();

    res.json({ message: "Successfully joined the group" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
