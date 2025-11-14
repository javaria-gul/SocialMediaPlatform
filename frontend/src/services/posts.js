// src/services/posts.js
import API from "./api";

export const createPost = (data) => API.post("/posts", data);
export const getFeed = (params) => API.get("/posts", { params });
export const reactPost = (postId, type) => API.post(`/posts/${postId}/react`, { type });
export const commentPost = (postId, text) => API.post(`/posts/${postId}/comment`, { text });
