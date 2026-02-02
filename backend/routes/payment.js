const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// @desc    Connectivity Test
// @route   GET /api/payment/test
// @access  Public
router.get('/test', (req, res) => {
  res.json({ status: 'active', timestamp: new Date(), message: 'Payment Route Connectivity Verified.' });
});

// @desc    Create payment intent
// @route   POST /api/payment/create-intent
// @access  Private (should be, but for simplicity we'll keep it public for now or assume frontend has basic auth)
router.post('/create-intent', async (req, res, next) => {
  try {
    const { amount, email, name } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to smallest currency unit (paise for INR)
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
      description: 'ChronoElite Watch Purchase',
      shipping: {
        name: name || 'Customer',
        address: {
          line1: 'Default Address', // You can pass actual address here
          country: 'IN',
        },
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @desc    Simulate payment success for Demo UPI/Wallet flow
 * @route   POST /api/payment/demo-success
 * @access  Public (Demo Purpose)
 */
router.post('/demo-success', async (req, res, next) => {
  try {
    const { manifest } = req.body;
    console.log('Incoming Demo Payment Manifest:', JSON.stringify(manifest, null, 2));

    if (!manifest || !manifest.items) {
      return res.status(400).json({ success: false, message: 'Invalid manifest format.' });
    }

    // Create a new order in the database
    const newOrder = new Order({
      transmissionId: manifest.transmissionId,
      items: manifest.items.map(item => {
        // Ensure productId is a valid ObjectId if possible, otherwise skip it to prevent schema validation crash
        const validId = mongoose.Types.ObjectId.isValid(item.id) ? item.id : undefined;
        return {
          productId: validId,
          name: item.name,
          img: item.img,
          price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.]/g, '')) : item.price,
          qty: item.qty,
          brand: item.brand
        };
      }),
      financials: {
        subtotal: manifest.subtotal,
        tax: manifest.tax,
        grandTotal: manifest.grandTotal
      },
      shippingDetails: {
        name: manifest.consumer,
        email: manifest.email || 'demo@example.com',
        mobile: manifest.mobile || '0000000000',
        address: manifest.destination
      },
      paymentStatus: 'Paid (Demo)',
      paymentMethod: manifest.protocol === 'SECURE DIGITAL' ? 'UPI (Demo)' : 'COD (Demo)',
    });

    console.log('Attempting to Save Order to Ledger...');
    await newOrder.save();
    console.log('Order Successfully Hallmarked.');

    res.status(201).json({
      success: true,
      message: 'Protocol Verified: Order Recorded In Ledger.',
      order: newOrder
    });
  } catch (err) {
    console.error('CRITICAL: Demo Payment Protocol Failure:', err);
    res.status(500).json({
      success: false,
      message: 'Transmission Failure: Backend Sync Error.',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

module.exports = router;
