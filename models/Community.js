import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profileinfos",
    required: true,
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const communitySchema = new mongoose.Schema({
  industry: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "profileinfos" }],
  chat: [messageSchema], // Add this line to store chat messages
});

export default mongoose.model("Community", communitySchema);
