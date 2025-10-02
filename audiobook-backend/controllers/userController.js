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

exports.getMyFavBooks = async (req, res) => {
  try {
    console.log('Getting favorite books for user:', req.userId);
    const userId = req.userId;
    const favBooks = await FavBooks.find({userId: userId}).populate('bookId','title author coverImage description rating reviews');
    console.log(`Found ${favBooks.length} favorite books for user ${userId}`);
    res.json({ favBooks, success: true });
  } catch (err) {
    console.error('Get fav books error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.removeFavBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    await FavBooks.findOneAndDelete({ userId: req.userId, bookId: bookId });
    res.json({ message: 'Favorite book removed successfully', success: true });
  } catch (err) {
    console.error('Remove fav book error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.checkFavBook = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.body;
    const favBook = await FavBooks.findOne({ userId: userId, bookId: bookId });
    if (favBook) {
      res.json({ favBook, success: true, message: 'Favorite book found' });
    } else {
      res.json({ message: 'Favorite book not found', success: false, message: 'Favorite book not found' });
    }
  } catch (err) {
    console.error('Check fav book error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    console.log('Getting all users...');
    const users = await User.find().select('-password');
    console.log(`Found ${users.length} users`);
    
    // Get all favorite books
    console.log('Getting all favorite books...');
    const allFavBooks = await FavBooks.find().populate('bookId','title author coverImage description');
    console.log(`Found ${allFavBooks.length} favorite books`);
    
    // Filter out favorite books with null bookId (orphaned references)
    const validFavBooks = allFavBooks.filter(favBook => favBook.bookId !== null);
    console.log(`Found ${validFavBooks.length} valid favorite books (${allFavBooks.length - validFavBooks.length} orphaned references)`);
    
    // Organize favorite books by user
    const usersWithFavBooks = users.map(user => {
      const userFavBooks = validFavBooks.filter(favBook => 
        favBook.userId.toString() === user._id.toString()
      );
      
      console.log(`User ${user.username} has ${userFavBooks.length} valid favorite books`);
      
      return {
        ...user.toObject(),
        favBooks: userFavBooks
      };
    });
    
    console.log('Sending response with users and their favorite books');
    res.json({ 
      users: usersWithFavBooks,
      success: true 
    });

  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Clean up orphaned favorite book references
exports.cleanupOrphanedFavBooks = async (req, res) => {
  try {
    console.log('Cleaning up orphaned favorite book references...');
    
    // Get all favorite books
    const allFavBooks = await FavBooks.find().populate('bookId');
    
    // Find orphaned references (where bookId is null)
    const orphanedFavBooks = allFavBooks.filter(favBook => favBook.bookId === null);
    
    if (orphanedFavBooks.length > 0) {
      console.log(`Found ${orphanedFavBooks.length} orphaned favorite book references`);
      
      // Delete orphaned references
      const orphanedIds = orphanedFavBooks.map(favBook => favBook._id);
      await FavBooks.deleteMany({ _id: { $in: orphanedIds } });
      
      console.log(`Deleted ${orphanedFavBooks.length} orphaned favorite book references`);
      
      res.json({
        message: `Cleaned up ${orphanedFavBooks.length} orphaned favorite book references`,
        deletedCount: orphanedFavBooks.length,
        success: true
      });
    } else {
      console.log('No orphaned favorite book references found');
      res.json({
        message: 'No orphaned favorite book references found',
        deletedCount: 0,
        success: true
      });
    }
    
  } catch (err) {
    console.error('Cleanup orphaned fav books error:', err);
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