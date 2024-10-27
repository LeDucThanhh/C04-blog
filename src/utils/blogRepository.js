const mongoose = require("mongoose");

// Định nghĩa Schema cho bài viết
const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5 },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Lấy tất cả bài viết
const getAllPosts = async () => await Post.find().sort({ createdAt: -1 });

// Lấy bài viết theo ID
const getPostById = async (id) => await Post.findById(id);

// Tạo bài viết mới
const createPost = async (data) => {
  const newPost = new Post(data);
  await newPost.save();
};

module.exports = { getAllPosts, getPostById, createPost };
