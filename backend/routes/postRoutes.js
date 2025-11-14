// backend/routes/postRoutes.js
import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createPost, getFeed, addReaction, addComment } from "../controllers/postController.js";

const router = express.Router();

router.get("/", requireAuth, getFeed);            // GET /api/posts
router.post("/", requireAuth, createPost);        // POST /api/posts
router.post("/:id/react", requireAuth, addReaction);  // POST /api/posts/:id/react
router.post("/:id/comment", requireAuth, addComment); // POST /api/posts/:id/comment

export default router;
