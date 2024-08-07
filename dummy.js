// dummyData.js

import mongoose from "mongoose";
// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/LCF";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Define a simple schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create a model
const User = mongoose.model("testuser", userSchema);

// Function to insert dummy data
const insertDummyData = async () => {
  try {
    const user = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      age: 30,
    });
    await user.save();
    console.log("Dummy data inserted");
  } catch (err) {
    console.error("Error inserting dummy data:", err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Insert the dummy data
insertDummyData();
