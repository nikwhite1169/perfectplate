const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe
const User = require('../models/user'); // Your user model

// Cancel Subscription Route
router.post('/cancel', async (req, res) => {
    const { email, reason } = req.body;
  
    console.log('Cancellation request received:', { email, reason }); // Debugging
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found:', email); // Debugging
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Cancel subscription in Stripe
      if (user.stripeSubscriptionId) {
        try {
          console.log('Canceling Stripe subscription:', user.stripeSubscriptionId); // Debugging
          await stripe.subscriptions.del(user.stripeSubscriptionId);
        } catch (stripeError) {
          console.error('Error canceling Stripe subscription:', stripeError);
          return res.status(500).json({ error: 'Failed to cancel Stripe subscription.' });
        }
      }
  
      // Update the user in the database
      user.subscriptionType = 'canceled';
      user.stripeSubscriptionId = null;
      user.active = false;
      await user.save();
  
      console.log('Subscription successfully canceled for user:', email); // Debugging
      res.status(200).json({ message: 'Subscription canceled successfully.' });
    } catch (error) {
      console.error('Error processing cancellation:', error);
      res.status(500).json({ error: 'Server error. Please try again later.' });
    }
  });
  
module.exports = router;
