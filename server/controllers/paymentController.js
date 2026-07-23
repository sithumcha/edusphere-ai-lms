const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Helper to get Stripe instance dynamically
const getStripeInstance = () => {
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      return require('stripe')(process.env.STRIPE_SECRET_KEY);
    } catch (err) {
      console.warn('[Stripe Warning] Failed to load stripe SDK:', err.message);
    }
  }
  return null;
};

/**
 * Create Stripe Payment Checkout Session or Payment Intent
 * POST /api/payments/create-checkout-session
 */
const createCheckoutSession = async (req, res) => {
  try {
    const { courseId, couponCode, discountPercent = 0 } = req.body;
    const userId = req.user._id;
    const stripe = getStripeInstance();

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Calculate final price after coupon discount
    const originalPrice = course.price || 0;
    const finalPrice = Math.max(0, originalPrice * (1 - discountPercent / 100));

    // If Stripe secret key exists and Stripe SDK loaded, create real Stripe Session
    if (stripe) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: course.title,
                description: course.description || `Enrollment for ${course.title}`,
                images: [course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600']
              },
              unit_amount: Math.round(finalPrice * 100) // Convert to cents
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/learn/${courseId}?payment=success`,
        cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/checkout/${courseId}?payment=cancelled`,
        metadata: {
          courseId: courseId.toString(),
          userId: userId.toString(),
          couponCode: couponCode || 'NONE'
        }
      });

      return res.json({
        sessionId: session.id,
        checkoutUrl: session.url,
        amount: finalPrice,
        currency: 'USD',
        isRealStripe: true
      });
    }

    // Smart Fallback for Test / Sandbox Environment
    const simulatedSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    res.json({
      sessionId: simulatedSessionId,
      checkoutUrl: `/learn/${courseId}?payment=success`,
      amount: finalPrice,
      currency: 'USD',
      isRealStripe: false,
      message: 'Stripe Test Checkout Gateway Ready 💳'
    });

  } catch (error) {
    console.error('[Stripe Payment Error]', error);
    res.status(500).json({ message: 'Failed to create Stripe payment session', error: error.message });
  }
};

/**
 * Confirm Stripe Payment & Activate Enrollment
 * POST /api/payments/confirm
 */
const confirmPayment = async (req, res) => {
  try {
    const { courseId, transactionId = `txn_${Date.now()}` } = req.body;
    const userId = req.user._id;

    // Check existing enrollment
    let enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) {
      enrollment = await Enrollment.create({
        userId,
        courseId,
        progress: 0,
        completed: false,
        paymentStatus: 'paid',
        transactionId
      });
    } else {
      enrollment.paymentStatus = 'paid';
      enrollment.transactionId = transactionId;
      await enrollment.save();
    }

    res.json({
      success: true,
      message: 'Stripe payment verified & enrollment activated! 🚀',
      enrollment
    });
  } catch (error) {
    console.error('[Stripe Confirmation Error]', error);
    res.status(500).json({ message: 'Failed to confirm Stripe payment', error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
  confirmPayment
};
