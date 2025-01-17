const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');  // Import the middleware

// Example route to get user details
router.get('/details', (req, res) => {
  res.status(200).json({ message: 'User details endpoint' });
});

router.put('/update', (req, res) => {
    const { email, subscriptionType } = req.body;
  
    if (!email || !subscriptionType) {
      return res.status(400).json({ error: 'Email and subscriptionType are required' });
    }
  
    res.status(200).json({ message: 'User updated successfully' });
  });

  router.put('/update-email', authMiddleware, async (req, res) => {
    const { email } = req.body;
  
    try {
      if (!email) return res.status(400).json({ error: 'Email is required.' });
  
      // Update email using authenticated user's ID
      const updatedUser = await User.findByIdAndUpdate(req.user.id, { email }, { new: true });
  
      if (!updatedUser) return res.status(404).json({ error: 'User not found.' });
  
      res.status(200).json({ message: 'Email updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
    
  const bcrypt = require('bcrypt');

  router.put('/update-password', authMiddleware, async (req, res) => {
    const { password } = req.body;
  
    try {
      if (!password) return res.status(400).json({ error: 'Password is required.' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Use req.user from the middleware instead of req.user.id (or ensure req.user.id is available)
      const updatedUser = await User.findByIdAndUpdate(req.user.id, { password: hashedPassword }, { new: true });
  
      if (!updatedUser) return res.status(404).json({ error: 'User not found.' });
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
router.put('/update-notifications', async (req, res) => {
    const { emailNotifications, pushNotifications } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { emailNotifications, pushNotifications },
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ error: 'User not found.' });
  
      res.status(200).json({ message: 'Notification preferences updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
module.exports = router;
