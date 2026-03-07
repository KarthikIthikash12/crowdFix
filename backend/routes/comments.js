const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Issue = require("../models/Issue");
const authMiddleware = require("../middleware/auth");

router.post("/issues/:id/comments", authMiddleware, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const newComment = new Comment({
      text: req.body.text,
      issue: req.params.id,
      createdBy: req.userId
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/issues/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ issue: req.params.id })
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/comments/:commentId", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!req.body.text || req.body.text.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    comment.text = req.body.text;
    const updated = await comment.save();

    res.status(200).json(updated);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/comments/:commentId", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
