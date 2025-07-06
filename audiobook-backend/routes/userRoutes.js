const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  deactivateAccount,
  reactivateAccount,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');

// Import auth middleware (you'll need to create this)
const auth = require('../middlewares/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.patch('/deactivate', auth, deactivateAccount);
router.patch('/reactivate', auth, reactivateAccount);

// Admin routes (require authentication + admin role)
router.get('/all', auth, getAllUsers);
router.delete('/:id', auth, deleteUser);

module.exports = router; 