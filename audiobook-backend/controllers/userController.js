const User = require('../models/User');
const Comment = require('../models/Comment');
const FavBooks = require('../models/FavBooks');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const {username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
      token,
      success: true
    });

  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      user: user.toJSON(),
      token,
      success: true
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: user.toJSON(),
      success: true
    });

  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;
    const updateData = {};

    // Only update provided fields
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON(),
      success: true
    });

  } catch (err) {
    console.error('Update profile error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Deactivate user account
exports.deactivateAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Account deactivated successfully',
      success: true
    });

  } catch (err) {
    console.error('Deactivate account error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Reactivate user account
exports.reactivateAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { isActive: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Account reactivated successfully',
      user: user.toJSON(),
      success: true
    });

  } catch (err) {
    console.error('Reactivate account error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });

  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete all user-related data
    await Promise.all([
      // Delete all comments by this user
      Comment.deleteMany({ userId: userId }),
      
      // Delete all favorite books by this user
      FavBooks.deleteMany({ userId: userId }),
      
      // Delete the user
      User.findByIdAndDelete(userId)
    ]);

    res.json({
      message: 'User and all related data deleted successfully',
      success: true
    });

  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}; 