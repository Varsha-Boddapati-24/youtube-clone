import mongoose from "mongoose"

// schema for the user model
const userSchema = new mongoose.Schema({
   // Username of the user
  username: {
    type: String,
    required: true,// Must be provided
    trim: true,   // Remove whitespace around the string
  },
   // Email of the user
  email: {
    type: String,
    required: true, // Email is mandatory for login/registration
    unique: true,   // No two users can have the same email
    lowercase: true,
    trim: true, // Removes extra spaces from the email
  },
  // Hashed password of the user
  password: {
    type: String,
    required: true,// Password is mandatory
  },
   // Reference to the user's channel (one-to-one)
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel"
  }
}, 
  // Automatically adds createdAt and updatedAt timestamps
{
  timestamps: true,
});
// Create and export the User model
const userModel = mongoose.model("user", userSchema)
export default userModel;