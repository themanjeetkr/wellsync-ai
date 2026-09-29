// routes/paymentRoutes.js
const express = require('express');
const router  = express.Router();

const { createOrder, verifyPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddlewares');
// 👆 use whatever your auth middleware export is called
//    (protect / verifyToken / authMiddleware — match your authMiddlewares.js)

// All payment routes are protected — user must be logged in
router.post('/create-order',    protect, createOrder);
router.post('/verify-payment',  protect, verifyPayment);
router.get('/history',          protect, getPaymentHistory);

module.exports = router;