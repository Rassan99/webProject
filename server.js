const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

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

// Comment schema
const Comment = mongoose.model(
  "Comment",
  new mongooseSchema({
    name: String,
    comment: String,
  })
);

app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, mobile, dob, language, message } =
    req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      message: "الاسم الأول، الاسم الأخير، البريد الإلكتروني والرسالة مطلوبة.",
    });
  }

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      mobile,
      dob,
      language,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "تم إرسال النموذج بنجاح.",
      firstName,
      lastName,
    });
  } catch (err) {
    res.status(500).json({ message: "فشل إرسال النموذج" });
  }
});

app.post("/api/comments", async (req, res) => {
  const { name, comment } = req.body;

  if (
    !name ||
    !comment ||
    name.trim().length < 2 ||
    comment.trim().length < 5
  ) {
    return res
      .status(400)
      .json({ message: "الاسم والتعليق مطلوبان وبشكل صحيح" });
  }

  try {
    await new Comment({
      name: name.trim(),
      comment: comment.trim(),
    }).save();

    res.status(201).json({ message: "تم إرسال التعليق بنجاح" });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "حدث خطأ أثناء حفظ التعليق" });
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
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
