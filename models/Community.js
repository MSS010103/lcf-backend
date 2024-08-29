// models/Community.js
import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  industry: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "profileinfos" }],
});

export default mongoose.model("Community", communitySchema);
