const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const connectDB = require("../configDatabase.js");
const {
  getAllPosts,
  getPostById,
  createPost,
} = require("./utils/blogRepository.js");

require("dotenv").config();
const app = express();

// Kết nối MongoDB
connectDB();

// Cấu hình Handlebars
app.use(express.static(path.resolve("src/public")));
app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route: Trang chủ
app.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.render("home", { title: "Blog Home", posts });
});

// Route: Chi tiết bài viết
app.get("/post/:id", async (req, res) => {
  const post = await getPostById(req.params.id);
  res.render("blogDetail", { title: post.title, post });
});

// Route: Trang liên hệ
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// Route: Xử lý form liên hệ
app.post("/contact", (req, res) => {
  console.log("Contact form submitted:", req.body);
  res.redirect("/");
});

// Route: Tạo bài viết mới (Test)
app.post("/post", async (req, res) => {
  await createPost(req.body);
  res.redirect("/");
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
