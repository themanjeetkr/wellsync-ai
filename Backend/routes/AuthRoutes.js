const express = require('express');
const router = express.Router();
const protect = require("../middlewares/authMiddlewares");
const loginLimiter = require("../middlewares/loginLimiter");
const {
  registerUser,
  login,
  refreshToken,
  logout,
  updateProfile,
  updatePassword,
} = require("../controllers/authController.js");

router.post("/register", registerUser);
router.post("/login", loginLimiter, login);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);

module.exports = router;

