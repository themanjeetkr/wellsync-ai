const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: (process.env.KEY_ID || "").trim(),
  key_secret: (process.env.KEY_SECRET || "").trim(),
});

module.exports = razorpay;
