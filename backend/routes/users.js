const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

// Follow / Unfollow user
router.post("/:id/follow", authMiddleware, async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    if (targetUserId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const userToFollow = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following?.includes(targetUserId);

    if (isFollowing) {
      currentUser.following.pull(targetUserId);
      userToFollow.followers.pull(currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      userToFollow.followers.push(currentUserId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: isFollowing ? "Unfollowed" : "Followed" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;