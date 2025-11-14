// backend/models/Post.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const reactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["love","support","funny","sad","unlike"] },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, trim: true, required: true },
  image: { type: String, default: null }, // later for image URL
  reactions: [reactionSchema],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
