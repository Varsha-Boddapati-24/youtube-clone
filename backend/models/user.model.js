import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true, // Email is mandatory for login/registration
    unique: true,   // No two users can have the same email
    lowercase: true,
    trim: true, // Removes extra spaces from the email
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
});

const userModel=mongoose.model("user",userSchema)
export default userModel;