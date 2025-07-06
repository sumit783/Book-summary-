const express = require('express');
const router = express.Router();
const { 
  createComment, 
  getCommentsByBook, 
  getAllComments, 
  getCommentById, 
  updateComment, 
  deleteComment, 
  getUserComments 
} = require('../controllers/commentController');
const auth = require('../middlewares/auth');

// Public routes - no authentication required
router.get('/comments/book/:bookId', getCommentsByBook);
router.get('/comments/:id', getCommentById);

// Protected routes - authentication required
router.post('/comments/', auth, createComment);
router.put('/comments/:id', auth, updateComment);
router.delete('/comments/:id', auth, deleteComment);
router.get('/comments/user/me', auth, getUserComments);

// Admin routes - authentication required (can add admin middleware later)
router.get('/comments/', auth, getAllComments);

module.exports = router; 