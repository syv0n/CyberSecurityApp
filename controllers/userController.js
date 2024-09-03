const { body, param, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }
  next();
};

exports.register = [
  body('username').isLength({ min: 5, max: 30 }).withMessage('Username must be between 5 and 30 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create(username, email, hashedPassword);
      const verificationToken = await User.createVerificationToken(user.id);
      await sendVerificationEmail(email, verificationToken);
      console.log(`Verification email sent to ${email} with token ${verificationToken}`);
      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  }
];

exports.login = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (user && await bcrypt.compare(password, user.password)) {
        const isVerified = await User.isEmailVerified(user.id);
        console.log(`User ${email} verification status: ${isVerified}`);
        if (isVerified) {
          const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
          res.json({ message: 'Login successful', token });
        } else {
          res.status(403).json({ message: 'Please verify your email before logging in.' });
        }
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  }
];

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(`Attempting to verify email with token: ${token}`);
    const verified = await User.verifyEmail(token);
    console.log(`Verification result: ${verified}`);
    if (verified) {
      res.json({ message: 'Email verified successfully. You can now log in.' });
    } else {
      res.status(400).json({ message: 'Invalid or expired verification token.' });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Error verifying email.' });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const user = await User.findById(userId);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

exports.updateProfile = [
  body('username').optional().isLength({ min: 5, max: 30 }).withMessage('Username must be between 5 and 30 characters'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.userData.userId;
      const { username, email } = req.body;
      const updatedUser = await User.update(userId, username, email);
      if (updatedUser) {
        res.json({ message: 'Profile updated successfully', user: updatedUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
  }
];

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const deleted = await User.delete(userId);
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.getUserById = [
  param('id').isInt().withMessage('User ID must be an integer'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (user) {
        res.json({ user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  }
];

exports.updateUserById = [
  param('id').isInt().withMessage('User ID must be an integer'),
  body('username').optional().isLength({ min: 5, max: 30 }).withMessage('Username must be between 5 and 30 characters'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const { username, email } = req.body;
      const updatedUser = await User.update(userId, username, email);
      if (updatedUser) {
        res.json({ message: 'User updated successfully', user: updatedUser });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  }
];

exports.deleteUserById = [
  param('id').isInt().withMessage('User ID must be an integer'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const deleted = await User.delete(userId);
      if (deleted) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  }
];