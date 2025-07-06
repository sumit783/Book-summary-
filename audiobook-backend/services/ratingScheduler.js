const cron = require('node-cron');
const Book = require('../models/Book');
const Comment = require('../models/Comment');

// Function to calculate and update book ratings
const calculateAndUpdateBookRatings = async () => {
  try {
    console.log('Starting scheduled book rating calculation...');
    
    // Get all books
    const books = await Book.find();
    
    for (const book of books) {
      try {
        // Calculate average rating from comments
        const ratingStats = await Comment.aggregate([
          { $match: { bookId: book._id } },
          { 
            $group: { 
              _id: null, 
              averageRating: { $avg: '$rating' },
              totalReviews: { $sum: 1 }
            } 
          }
        ]);

        let newRating = 0;
        let newReviews = 0;

        if (ratingStats.length > 0) {
          newRating = Math.round(ratingStats[0].averageRating * 10) / 10; // Round to 1 decimal place
          newReviews = ratingStats[0].totalReviews;
        }

        // Update book with new rating and review count
        await Book.findByIdAndUpdate(book._id, {
          rating: newRating,
          reviews: newReviews,
          updatedAt: new Date()
        });

        console.log(`Updated book "${book.title}": Rating: ${newRating}, Reviews: ${newReviews}`);
        
      } catch (bookError) {
        console.error(`Error updating book ${book._id}:`, bookError);
      }
    }

    console.log('Scheduled book rating calculation completed successfully');
    
  } catch (error) {
    console.error('Error in scheduled rating calculation:', error);
  }
};

// Function to calculate rating for a specific book
const calculateBookRating = async (bookId) => {
  try {
    const ratingStats = await Comment.aggregate([
      { $match: { bookId: bookId } },
      { 
        $group: { 
          _id: null, 
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        } 
      }
    ]);

    let newRating = 0;
    let newReviews = 0;

    if (ratingStats.length > 0) {
      newRating = Math.round(ratingStats[0].averageRating * 10) / 10;
      newReviews = ratingStats[0].totalReviews;
    }

    // Update the specific book
    await Book.findByIdAndUpdate(bookId, {
      rating: newRating,
      reviews: newReviews,
      updatedAt: new Date()
    });

    return { rating: newRating, reviews: newReviews };
    
  } catch (error) {
    console.error('Error calculating book rating:', error);
    throw error;
  }
};

// Schedule the task to run at 12 AM daily
const startRatingScheduler = () => {
  // Schedule task to run at 12:00 AM every day
  cron.schedule('0 0 * * *', () => {
    console.log('Running scheduled book rating calculation at 12 AM...');
    calculateAndUpdateBookRatings();
  }, {
    scheduled: true,
    timezone: "UTC" // You can change this to your timezone
  });

  console.log('Book rating scheduler started. Will run daily at 12 AM UTC.');
};

// Function to manually trigger rating calculation (for testing or immediate updates)
const triggerRatingCalculation = async () => {
  console.log('Manually triggering book rating calculation...');
  await calculateAndUpdateBookRatings();
};

// Function to calculate rating for a specific book immediately
const updateBookRating = async (bookId) => {
  try {
    const result = await calculateBookRating(bookId);
    console.log(`Updated rating for book ${bookId}:`, result);
    return result;
  } catch (error) {
    console.error('Error updating book rating:', error);
    throw error;
  }
};

module.exports = {
  startRatingScheduler,
  calculateAndUpdateBookRatings,
  calculateBookRating,
  triggerRatingCalculation,
  updateBookRating
}; 