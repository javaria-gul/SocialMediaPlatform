// backend/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstLogin: { type: Boolean, default: true },
username: { type: String, unique: true, sparse: true },
avatar: { type: String, default: "" },

role: { type: String, enum: ["student", "faculty"], default: null },

semester: { type: String, default: null },
batch: { type: String, default: null },
subjects: { type: [String], default: [] },

following: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
followers: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
