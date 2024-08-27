import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }, // The group name will be the project concept
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
      profileImageUrl: String,
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
