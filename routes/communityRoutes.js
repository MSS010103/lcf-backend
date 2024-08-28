// routes/communityRoutes.js
import express from "express";
import { getCommunityMembers } from "../controllers/communityController.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

// GET /api/communities/:industry - Get all members of a specific community
router.get("/:industry", authenticateToken, getCommunityMembers);

export default router;
