const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue"); 
const authMiddleware = require("../middleware/auth"); 
const Comment = require("../models/Comment"); 
const validateIssue = require("../middleware/validateIssue"); 
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

router.get("/", async (req, res) => {
  try {
    const {
      sort = "recent",
      resolved,
      page = 1,
      limit = 6,
      search
    } = req.query;

    let filter = {};
    let sortOption = {createdAt: -1};

    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    if (resolved === "true") filter.resolved = true;
    if (resolved === "false") filter.resolved = false;

  
    if (sort === "popular") sortOption.upvotes = -1;
    else sortOption.createdAt = -1;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const totalIssues = await Issue.countDocuments(filter);

    const issues = await Issue.find(filter)
  .populate("createdBy", "username profilePic followers")
  .sort(sortOption)
  .skip(skip)
  .limit(limitNumber);

const issuesWithCommentCount = await Promise.all(
  issues.map(async (issue) => {
    const commentCount = await Comment.countDocuments({ issue: issue._id });

    return {
      ...issue._doc,
      commentsCount: commentCount
    };
  })
);

res.status(200).json({
  issues: issuesWithCommentCount,
  currentPage: pageNumber,
  totalPages: Math.ceil(totalIssues / limitNumber)
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/my", authMiddleware, async(req, res) => {
    try {
        // Add .populate() here to swap the ID for the actual user object
        const myIssues = await Issue.find({ createdBy: req.userId })
            .populate("createdBy", "username") 
            .sort({ createdAt: -1 });

        res.status(200).json(myIssues); 
    }
    catch(err) {
        res.status(500).json({ error: err.message }); 
    }
});
router.get("/trending", async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 5;

        const trendingIssues = await Issue.find({ resolved: false })
            .sort({ upvotes: -1, createdAt: -1 })
            .limit(limit)
            .populate("createdBy", "username");

        res.status(200).json(trendingIssues);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.patch("/:id/upvote", authMiddleware, async(req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if(!issue) return res.status(404).json({message: "Issue not found"}); 
        
        if(issue.resolved) return res.status(400).json({message: "Cannot upvote a resolved issue"}); 

        const userId = req.userId;
        const alreadyUpvoted = issue.upvotedBy.includes(userId); 
        
        if(alreadyUpvoted){
            issue.upvotedBy.pull(userId);
            issue.upvotes -= 1; 
        } else {
            issue.upvotedBy.push(userId);
            issue.upvotes += 1; 
        }

        await issue.save(); 
        
        // FIX: Re-populate the user before sending to frontend
        const updatedIssue = await Issue.findById(issue._id)
            .populate("createdBy", "username profilePic followers");

        res.status(200).json(updatedIssue); 
    } catch(err){
        res.status(500).json({error: err.message}); 
    }   
}); 
router.delete("/:id", authMiddleware, async(req, res) =>{
    try{
        const issue = await Issue.findById(req.params.id);
        if(!issue) {
            return res.status(404).json({message: "Issue not found"});
        }
        if(issue.createdBy.toString() != req.userId){
            return res.status(403).json({message: "Not authorized to delete this issue"}); 
        } 
        await issue.deleteOne(); 
        res.status(200).json({message: "Issue deleted successfully"}); 
    } catch(err){
        res.status(400).json({error: err.message}); 
    }
})
router.patch("/:id/resolve", authMiddleware, async(req, res) => {
    try{
        const issue = await Issue.findById(req.params.id); 
        if(!issue){
            return res.status(404).json({message: "Issue not found"}); 
        }  
        if (!issue.createdBy) {
            return res.status(400).json({
                message: "Issue has no owner data"
            });
        }
        if(issue.createdBy.toString() !== req.userId){
            return res.status(403).json({
                message: "Not authorized to resolve this issue"
            });
        }
        issue.resolved = !issue.resolved;  
        const updatedIssue = await issue.save();  
        res.status(200).json(updatedIssue); 
    }
    catch(err){
        res.status(400).json({error: err.message}); 
    }
})
router.put(
  "/:id",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    try {
      const issue = await Issue.findById(req.params.id);

      if (!issue) {
        return res.status(404).json({ message: "Issue not found" });
      }

      if (issue.createdBy.toString() !== req.userId) {
        return res.status(403).json({ message: "Not authorized" });
      }

      issue.description = req.body.description || issue.description;
      issue.location = req.body.location || issue.location;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        issue.photo = result.secure_url;
      }

      const updated = await issue.save();
      res.status(200).json(updated);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("createdBy", "username profilePic");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const comments = await Comment.find({ issue: req.params.id })
      .populate("createdBy", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      issue,
      comments
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    // 1. Prepare the update data from the request body
    const { description, photo, resolved } = req.body;
    const updateData = {};
    if (description !== undefined) updateData.description = description;
    if (photo !== undefined) updateData.photo = photo;
    if (resolved !== undefined) updateData.resolved = resolved;

    // 2. Perform the update AND populate in one go
    // 'new: true' returns the document AFTER the fix is applied
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId }, // Only update if it belongs to the user
      { $set: updateData },
      { new: true }
    ).populate("createdBy", "username");

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found or unauthorized" });
    }

    res.json(updatedIssue);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post(
  "/",
  authMiddleware,
  upload.single("photo"),   
  async (req, res) => {
    try {
      const description = req.body.description;
      const location = req.body.location;

      if (!description || description.trim().length < 5) {
        return res.status(400).json({
          message: "Description must be at least 5 characters"
        });
      }

      if (!location) {
        return res.status(400).json({ message: "Location required" });
      }

      let imageUrl = "";
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      const newIssue = new Issue({
        description,
        location,
        photo: imageUrl,
        createdBy: req.userId
      });

      const savedIssue = await newIssue.save();
      res.status(201).json(savedIssue);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.delete("/:id/comments/:commentId", authMiddleware, async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 