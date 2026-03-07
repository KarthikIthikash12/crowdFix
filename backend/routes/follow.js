const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.patch("/:id/follow", auth, async (req, res) => {
  const me = await User.findById(req.userId);
  const target = await User.findById(req.params.id);

  if (!target) return res.status(404).json({ message: "User not found" });
  if (req.userId === req.params.id)
    return res.status(400).json({ message: "Cannot follow yourself" });

  const isFollowing = me.following.includes(target._id);

  if (isFollowing) {
    me.following.pull(target._id);
    target.followers.pull(me._id);
  } else {
    me.following.push(target._id);
    target.followers.push(me._id);
  }

  await me.save();
  await target.save();

  res.json({ following: !isFollowing });
});

module.exports = router;