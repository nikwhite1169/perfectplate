const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionType: {
    type: String,
    enum: ['monthly', 'yearly', 'canceled'],
    default: 'monthly', // Default subscription type
  },
  customerId: { type: String, required: true },  // Ensure this field exists
  stripeCustomerId: { type: String }, // New field for Stripe Customer ID
  stripeSubscriptionId: { type: String }, // Stripe subscription ID
  active: { type: Boolean, default: true }, // Tracks if the account is active
  createdAt: { type: Date, default: Date.now }, // User creation date
});

// Pre-save middleware to hash the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to validate password
UserSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to check if the account is active
UserSchema.methods.isActive = function () {
  return this.active;
};

module.exports = mongoose.model('User', UserSchema);
