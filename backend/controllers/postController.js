// backend/controllers/postController.js
import Post from "../models/Post.js";

// Create a post
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: "Post text is required" });

    const post = new Post({ user: userId, text: text.trim() });
    await post.save();

    // populate basic user info if needed (optional)
    await post.populate({ path: "user", select: "name email" }).execPopulate?.() ;

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create post failed", error: err.message });
  }
};

// Get feed (paginated) with trending pinned
export const getFeed = async (req, res) => {
  try {
    // simple pagination
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    // simple "trending" score = reactions count * 2 + comments count
    const posts = await Post.find()
      .lean()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate({ path: "user", select: "name" });

    // compute score and return sorted with trending separated (not changing DB)
    const withScore = posts.map(p => ({
      ...p,
      reactionsCount: p.reactions?.length || 0,
      commentsCount: p.comments?.length || 0,
      score: ((p.reactions?.length || 0) * 2) + (p.comments?.length || 0) - ((Date.now() - new Date(p.createdAt)) / (1000*60*60*24)),
    }));

    // sort locally by score desc, but still keep pagination simple:
    withScore.sort((a,b) => b.score - a.score);

    res.json({ page, posts: withScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Get feed failed", error: err.message });
  }
};

// Add reaction
export const addReaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: postId } = req.params;
    const { type } = req.body;
    if (!["love","support","funny","sad","unlike"].includes(type)) return res.status(400).json({ message: "Invalid reaction type" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // if user already reacted with same type -> remove (toggle)
    const existingIndex = post.reactions.findIndex(r => r.user.toString() === userId);
    if (existingIndex !== -1) {
      // replace reaction type if different, otherwise remove
      if (post.reactions[existingIndex].type === type) {
        post.reactions.splice(existingIndex, 1);
      } else {
        post.reactions[existingIndex].type = type;
        post.reactions[existingIndex].createdAt = new Date();
      }
    } else {
      post.reactions.push({ user: userId, type });
    }

    await post.save();
    res.json({ message: "Reaction updated", reactions: post.reactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add reaction failed", error: err.message });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: postId } = req.params;
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: "Comment text is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: userId, text: text.trim() });
    await post.save();
    res.status(201).json({ message: "Comment added", comments: post.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add comment failed", error: err.message });
  }
};
