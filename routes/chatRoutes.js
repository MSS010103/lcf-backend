import express from "express";
import {
  getCommunityChat,
  postCommunityChat,
} from "../controllers/communityController.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

// GET /api/chat/:industry - Get chat messages for a specific community
router.get("/:industry", authenticateToken, getCommunityChat);

// POST /api/chat/:industry - Post a new message to a community chat
router.post("/:industry", authenticateToken, postCommunityChat);

export default router;
