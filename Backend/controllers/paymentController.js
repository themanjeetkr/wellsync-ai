// controllers/paymentController.js
const razorpay = require('../config/razorpay');
const Payment  = require('../models/Payment');
const crypto   = require('crypto');


// ─── 1. Create Order ────────────────────────────────────────
// Called first — creates an order on Razorpay and returns order_id
const createOrder = async (req, res) => {
  try {
    const { amount, plan } = req.body;
    // amount comes from frontend in rupees, we convert to paise
    const amountInPaise = amount * 100;

    const order = await razorpay.orders.create({
      amount:   amountInPaise,
      currency: 'INR',
      receipt:  `receipt_${req.user._id}_${Date.now()}`,
    });

    res.status(200).json({
      success:  true,
      order_id: order.id,
      amount:   order.amount,
      currency: order.currency,
      key_id:   process.env.RAZORPAY_KEY_ID,
      plan:     plan || 'Premium',
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
};


// ─── 2. Verify Payment ──────────────────────────────────────
// Called after user pays — verifies the signature and saves to DB
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      plan,
    } = req.body;

    // Recreate signature using your secret
    const body             = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    // Compare
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid signature.',
      });
    }

    // ✅ Signature matched — save to DB
    const payment = await Payment.create({
      userId:               req.user._id,   // from authMiddleware
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      status:               'paid',
      plan:                 plan || 'Premium',
    });

    // Optional: update User model to mark as premium
    // await User.findByIdAndUpdate(req.user._id, { isPremium: true });

    res.status(200).json({
      success: true,
      message: 'Payment verified and saved!',
      payment,
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
};


// ─── 3. Get Payment History ─────────────────────────────────
// Optional — shows user their past payments
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
                                  .sort({ createdAt: -1 });

    res.status(200).json({ success: true, payments });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch payments' });
  }
};


module.exports = { createOrder, verifyPayment, getPaymentHistory };