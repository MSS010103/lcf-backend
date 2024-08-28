// models/Community.js
import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    industry: {
      type: String,
      required: true,
      unique: true, // Each industry should have only one community
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile", // Reference to the profile model
      },
    ],
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
