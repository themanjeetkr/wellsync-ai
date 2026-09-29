const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const paymentRoutes = require("./routes/paymentRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/AuthRoutes");
const journalRoutes = require("./routes/journalRoutes");
const mealRoutes = require("./routes/mealRoutes");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

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
