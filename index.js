import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import crypto from "crypto";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { Server } from "socket.io";
import http from "http";

import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import { authenticateToken } from './utils/authMiddleware.js';
import notificationRoutes from './routes/notificationRoutes.js';
import postRoutes from './routes/postRoutes.js';
import conversationRoutes from './routes/conversations.js';
import messageRoutes from './routes/messageRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import privacyRoutes from './routes/privacyRoutes.js';
import blockRoutes from './routes/blockRoutes.js'
import searchRoutes from './routes/searchRoutes.js';

import webSocketController from './controllers/webSocket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
//app.use(cors()) 
app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // Enable preflight requests for all routes

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection using MongoDB Atlas connection string
const mongoURI =
  "mongodb+srv://immanjot01:My%40aircel1@cluster0.cjafl.mongodb.net/LetsCofound";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));;

// Secret key (this should be stored securely and not hard-coded in real applications)
const secretKey = "your_secret_key";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.get("/api", (req, res) => {
  res.send(
    "API base endpoint. Use /api/auth, /api/projects, etc. for specific routes."
  );
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api', otpRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api', messageRoutes);

// Storage multer
app.use('/uploads', express.static('uploads'));

app.get("/api/cities", async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get("https://api.geonames.org/searchJSON", {
      params: {
        q,
        maxRows: 10,
        username: "hephzibah", // Your GeoNames username
      },
    });

    // Send the fetched data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).json({ error: "Failed to fetch city data" });
  }
});

// Saving of profile details
app.use('/api/profiles', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', postRoutes);
app.use('/api/message', messageRoutes);

// Initialize WebSocket controller
webSocketController(io);
export { io };
app.use('/api/account', accountRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/privacy', privacyRoutes);
app.use('/api/block', blockRoutes);
app.use('/api/search', searchRoutes);
app.use('/api', recommendationRoutes);

// Start the server
const port = 9002;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


