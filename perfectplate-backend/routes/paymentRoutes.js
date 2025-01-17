const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const User = require('../models/user');

// Function to check test card numbers (Optional in test mode)
function isTestCard(cardNumber) {
  const testBins = ['424242', '400000', '555555']; // Test BINs for Stripe
  const isTestEnvironment = process.env.STRIPE_SECRET_KEY.startsWith('sk_test');
  if (isTestEnvironment) {
    return false; // Allow test cards in test mode
  }
  return testBins.some((bin) => cardNumber.startsWith(bin));
}

// Payment Route for Checkout
let activeRequests = 0; // Track active requests

router.post('/checkout', async (req, res) => {
    activeRequests++;
    console.log('--------- NEW REQUEST to /checkout ---------');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Query:', req.query);
  
    const { paymentMethodId, amount, email } = req.body;
    console.log('Payment Request Received:', { email, amount, paymentMethodId });
  
    if (!amount || isNaN(parseInt(amount, 10)) || amount <= 0) {
      console.log('Invalid or missing amount');
      activeRequests--;
      return res.status(400).json({ error: 'Invalid or missing amount.' });
    }
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount, 10),
        currency: 'usd',
        payment_method: paymentMethodId,
        payment_method_types: ['card'],
        receipt_email: email,
        confirm: true,
      });
  
      console.log('PaymentIntent Created:', paymentIntent);
      activeRequests--;
      return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Payment validation error:', error);
      activeRequests--;
      return res.status(400).json({ error: error.message });
    }
  });
      
  router.post('/update-payment-method', async (req, res) => {
    const { userId, paymentMethodId } = req.body; // Assume you pass userId or retrieve it from session/auth token
  
    if (!userId || !paymentMethodId) {
        return res.status(400).json({ error: 'User ID and Payment Method ID are required.' });
      }
    
    try {
      // Fetch user from MongoDB
      const user = await User.findById(userId);
      if (!user || !user.customerId) {
        return res.status(404).json({ error: 'User or Stripe customer not found.' });
      }
  
      const customerId = user.customerId;
  
      // Attach the new payment method to the customer
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
  
      // Update the customer's default payment method
      await stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
  
      res.status(200).json({ message: 'Payment method updated successfully.' });
    } catch (error) {
      console.error('Error updating payment method:', error);
      res.status(500).json({ error: error.message });
    }
  });
      
module.exports = router;
