const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..")));

const mongooseSchema = mongoose.Schema;
const Contact = mongoose.model(
  "Contact",
  new mongooseSchema({
    firstName: String,
    lastName: String,
    gender: String,
    mobile: String,
    dob: Date,
    email: String,
    language: String,
    message: String,
  })
);

const Comment = mongoose.model(
  "Comment",
  new mongooseSchema({
    name: String,
    comment: String,
  })
);

app.post("/api/contact", async (req, res) => {
  try {
    await new Contact(req.body).save();
    res.status(201).json({ message: "تم إرسال النموذج بنجاح" });
  } catch (e) {
    res.status(400).json({ message: "فشل إرسال النموذج" });
  }
});

app.post("/api/comments", async (req, res) => {
  try {
    await new Comment(req.body).save();
    res.status(201).json({ message: "تم إرسال التعليق" });
  } catch (e) {
    res.status(400).json({ message: "فشل إرسال التعليق" });
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json({ message: "فشل تحميل التعليقات" });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
