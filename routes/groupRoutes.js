// Routes/groupRoutes.js
import express from "express";
import { getUserGroups } from "../controllers/groupController.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = express.Router();

// GET /api/groups - Get all groups for the logged-in user
router.get("/", authenticateToken, getUserGroups);

export default router;
