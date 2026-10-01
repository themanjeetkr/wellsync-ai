const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const paymentRoutes = require("./routes/paymentRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/AuthRoutes");
const journalRoutes = require("./routes/journalRoutes");
const mealRoutes = require("./routes/mealRoutes");

const app = express();

// CORS configuration for cookies & cross-origin credentials
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        return callback(null, origin);
      }
      return callback(null, origin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;

// Test route
app.get("/api", (req, res) => {
  res.send("api is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/payment", paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
