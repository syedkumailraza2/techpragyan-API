import NewsPost from "../models/newsModel.js";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await NewsPost.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await NewsPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const newPost = await NewsPost.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await NewsPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await NewsPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
