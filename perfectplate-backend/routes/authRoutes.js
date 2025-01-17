const express = require('express');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/user');
const router = express.Router();

// Register User
router.post('/signup', async (req, res) => {
  const { email, password, subscriptionType, paymentMethodId, amount } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !subscriptionType) {
      return res.status(400).json({ error: 'Email, password, and subscription type are required.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Create Stripe Customer
    const customer = await stripe.customers.create({
      email,
      metadata: { subscriptionType },
    });

    if (!customer.id) {
      return res.status(500).json({ error: 'Failed to create Stripe customer.' });
    }

    // Create the user and store the Stripe customer ID
    const user = new User({
      email,
      password, // This will be hashed by the pre-save hook
      subscriptionType,
      customerId: customer.id, // Save the Stripe customer ID
    });
    await user.save();

    // Optionally, attach the payment method to the customer if paymentMethodId is provided
    if (paymentMethodId) {
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully.',
      token,
      customerId: customer.id,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Check if the account is active
    if (!user.isActive()) {
      return res.status(403).json({ error: 'Account is inactive. Please contact support.' });
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password.' });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('User logging in with customerId:', user.customerId); // Debug log

    res.status(200).json({
      message: 'Login successful.',
      token,
      customerId: user.customerId, // Include Stripe customer ID
      userId: user._id
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Reactivate Account
router.post('/reactivate', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    user.active = true;
    user.subscriptionType = 'monthly'; // Default to monthly or as per your logic
    await user.save();

    res.status(200).json({ message: 'Account reactivated successfully.' });
  } catch (error) {
    console.error('Error reactivating account:', error);
    res.status(500).json({ error: 'Failed to reactivate account.' });
  }
});

module.exports = router;
