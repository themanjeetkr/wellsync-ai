// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,   // stored in paise
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  plan: {
    type: String,     // e.g. "Premium Monthly"
    default: 'Premium',
  },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);