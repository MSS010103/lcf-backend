import mongoose from "mongoose";

const FollowerUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  profileImage: { type: String },
});
const FollowingUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  profileImage: { type: String },
});
const blockedUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  profileImage: { type: String }
});
const skillSetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  skills: { type: [String], required: true },
});

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    experience: { type: String, required: false },
    education: { type: String, required: false },
    achievements: { type: String, required: false },
    designation: { type: String, required: false },
    company: { type: String, required: false },
    profileImage: { type: String, required: true },
    backgroundImage: { type: String, required: false },
    website: { type: String, required: false },
    location: { type: String, required: true },
    industries: { type: [String], required: false },
    skillSets: { type: [skillSetSchema], required: false },
    employment: { type: String, required: false },
    followers: { type: [FollowerUserSchema], default: [] },
    following: { type: [FollowingUserSchema], default: [] },
    reportUsers: { type: [String], default: [] },
    blockedUsers: { type: [blockedUserSchema], default: [] },
  },
  { timestamps: true }
);

const Profile = mongoose.model("profileinfos", profileSchema);

export default Profile;
