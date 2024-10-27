const mongoose = require("mongoose");
require("dotenv").config(); // Nạp biến môi trường từ .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      connectTimeoutMS: 10000, // Thiết lập thời gian timeout
      serverSelectionTimeoutMS: 5000, // Thời gian chờ chọn server
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Thoát nếu kết nối thất bại
  }
};

module.exports = connectDB;
