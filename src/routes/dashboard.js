const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const User = require("../models/User");

// GET /api/getAllUsers - protected route
router.get("/getAllUsers", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
