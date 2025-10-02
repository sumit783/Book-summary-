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
  deleteUser,
  cleanupOrphanedFavBooks,
  getMyFavBooks,
  removeFavBook,
  checkFavBook
} = require('../controllers/userController');

// Import auth middleware (you'll need to create this)
const auth = require('../middlewares/auth');
const verifySupabaseToken = require("../middlewares/adminAuth");

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', auth, getProfile);
router.get('/myFavBooks', auth, getMyFavBooks);
router.post('/removeFavBook', auth, removeFavBook);
router.post('/checkFavBook', auth, checkFavBook);
router.put('/profile', auth, updateProfile);

router.patch('/deactivate', auth, deactivateAccount);
router.patch('/reactivate', auth, reactivateAccount);

// Admin routes (require authentication + admin role)
router.get('/allUsers', verifySupabaseToken, getAllUsers);
router.delete('/:id', verifySupabaseToken, deleteUser);
router.post('/cleanup-orphaned-favbooks', verifySupabaseToken, cleanupOrphanedFavBooks);

module.exports = router; 