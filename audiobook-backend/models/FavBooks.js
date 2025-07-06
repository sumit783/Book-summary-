const mongoose = require('mongoose');

const favBooksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
}, {
  timestamps: true
});

// Create compound index to prevent duplicate favorites from same user on same book
favBooksSchema.index({ userId: 1, bookId: 1 }, { unique: true });

// Add virtual for formatted date
favBooksSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtual fields are serialized
favBooksSchema.set('toJSON', { virtuals: true });
favBooksSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('FavBooks', favBooksSchema);
