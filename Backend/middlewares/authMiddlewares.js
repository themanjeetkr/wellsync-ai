const jwt = require("jsonwebtoken");
const User = require("../models/User");
const analyzeJournal = require("../utils/aiAnalysis");
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);

      // Attach full user (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", isExpired: true });
    }
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
