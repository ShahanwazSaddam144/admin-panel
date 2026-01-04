// app/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
