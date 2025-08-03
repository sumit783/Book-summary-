const Comment = require('../models/Comment');
const User = require('../models/User');
const Book = require('../models/Book');
const { updateBookRating } = require('../services/ratingScheduler');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate required fields
    if (!bookId || !rating || !comment) {
      return res.status(400).json({ 
        error: 'Book ID, rating, and comment are required' 
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }

    // Validate comment length
    if (comment.length < 1 || comment.length > 500) {
      return res.status(400).json({ 
        error: 'Comment must be between 1 and 500 characters' 
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if user has already commented on this book
    const existingComment = await Comment.findOne({ userId, bookId });
    if (existingComment) {
      return res.status(400).json({ 
        error: 'You have already commented on this book' 
      });
    }

    // Create new comment
    const newComment = new Comment({
      userId,
      bookId,
      rating,
      comment
    });

    await newComment.save();

    // Update book rating immediately
    await updateBookRating(bookId);

    // Populate user info for response
    await newComment.populate('userId', 'username email');

    res.status(201).json({
      message: 'Comment created successfully',
      comment: newComment,
      user: {
        username: newComment.userId.username,
        email: newComment.userId.email
      },
      success: true
    });

  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all comments for a specific book
exports.getCommentsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    // Validate bookId
    if (!bookId) {
      return res.status(400).json({ error: 'Book ID is required' });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOrder = sort === 'rating' ? -1 : -1; // Default to newest first

    // Get comments with pagination and sorting
    const comments = await Comment.find({ bookId })
      .populate('userId', 'username email')
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    // Map comments to include user details explicitly
    const commentsWithUser = comments.map(comment => ({
      _id: comment._id,
      bookId: comment.bookId,
      rating: comment.rating,
      comment: comment.comment,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      user: comment.userId ? {
        _id: comment.userId._id,
        username: comment.userId.username,
        email: comment.userId.email
      } : null
    }));

    // Get total count for pagination
    const totalComments = await Comment.countDocuments({ bookId });
    const totalPages = Math.ceil(totalComments / limit);

    // Calculate average rating
    const avgRating = await Comment.aggregate([
      { $match: { bookId: bookId } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    const averageRating = avgRating.length > 0 ? avgRating[0].avgRating : 0;

    res.json({
      comments: commentsWithUser,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalComments,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      averageRating: Math.round(averageRating * 10) / 10,
      success: true
    });

  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all comments (admin function)
exports.getAllComments = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort = 'createdAt' } = req.query;

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOrder = sort === 'rating' ? -1 : -1;

    // Get comments with pagination and sorting
    const comments = await Comment.find()
      .populate('userId', 'email')
      .populate('bookId', 'title author')
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const totalComments = await Comment.countDocuments();
    const totalPages = Math.ceil(totalComments / limit);

    res.json({
      comments,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalComments,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      success: true
    });

  } catch (err) {
    console.error('Error fetching all comments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id)
      .populate('userId', 'email')
      .populate('bookId', 'title author');

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({
      comment,
      success: true
    });

  } catch (err) {
    console.error('Error fetching comment:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update comment (only by comment owner)
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId; // From auth middleware

    // Validate required fields
    if (!rating && !comment) {
      return res.status(400).json({ 
        error: 'At least one field (rating or comment) is required' 
      });
    }

    // Find the comment
    const existingComment = await Comment.findById(id);
    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user owns the comment
    if (existingComment.userId.toString() !== userId) {
      return res.status(403).json({ 
        error: 'You can only update your own comments' 
      });
    }

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }

    // Validate comment length if provided
    if (comment && (comment.length < 1 || comment.length > 500)) {
      return res.status(400).json({ 
        error: 'Comment must be between 1 and 500 characters' 
      });
    }

    // Update comment
    const updateData = {};
    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('userId', 'email');

    // Update book rating immediately
    await updateBookRating(updatedComment.bookId);

    res.json({
      message: 'Comment updated successfully',
      comment: updatedComment,
      success: true
    });

  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete comment (only by comment owner or admin)
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // From auth middleware

    // Find the comment
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user owns the comment (or is admin - you can add admin check here)
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ 
        error: 'You can only delete your own comments' 
      });
    }

    const bookId = comment.bookId; // Store bookId before deletion
    await Comment.findByIdAndDelete(id);

    // Update book rating immediately
    await updateBookRating(bookId);

    res.json({
      message: 'Comment deleted successfully',
      success: true
    });

  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user's comments
exports.getUserComments = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const { page = 1, limit = 10 } = req.query;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get user's comments
    const comments = await Comment.find({ userId })
      .populate('bookId', 'title author coverImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const totalComments = await Comment.countDocuments({ userId });
    const totalPages = Math.ceil(totalComments / limit);

    res.json({
      comments,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalComments,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      success: true
    });

  } catch (err) {
    console.error('Error fetching user comments:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
