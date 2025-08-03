const Book = require('../models/Book');
const Comment = require('../models/Comment');
const FavBooks = require('../models/FavBooks');
const slugify = require('slugify');
const generateAudio = require('../services/ttsService');

exports.createBook = async (req, res) => {
    try {
      const {
        title,
        author,
        description,
        summary,
        metaTitle,
        metaDescription,
        metaKeywords,
        genre,
        categories,
        affiliateLink,
        publicationDate,
        rating,
        reviews,
      } = req.body;
  
      // Check for existing book with the same title (case-insensitive)
      const existingBookByTitle = await Book.findOne({ title: { $regex: `^${title}$`, $options: 'i' } });
      if (existingBookByTitle) {
        return res.status(400).json({ error: 'Book with this title already exists.' });
      }

      // Generate base slug
      let slug = slugify(title, { lower: true });
      // Check if slug exists and append timestamp if it does
      const existingBook = await Book.findOne({ slug });
      if (existingBook) {
        const timestamp = Date.now();
        slug = `${slug}-${timestamp}`;
      }

      const coverImagePath = req.file ? `/uploads/${req.file.filename}` : null;
      const audioPath = await generateAudio(summary, title);
      console.log(`Generated audio path: ${audioPath}`);

      if (!title || !author || !summary) {
        return res.status(400).json({ error: 'Title, author, and summary are required' });
      }
      if (!audioPath) {
        return res.status(500).json({ error: 'Audio generation failed' });
      }
      if (!coverImagePath) {
        return res.status(400).json({ error: 'Cover image is required' });
      }

      const book = new Book({
        title,
        author,
        description,
        summary,
        metaTitle,
        metaDescription,
        metaKeywords,
        genre,
        categories,
        affiliateLink,
        publicationDate,
        rating,
        reviews,
        coverImage: coverImagePath,
        audioUri: audioPath,
        slug,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
  
      await book.save();
      res.status(201).json(book);
    } catch (err) {
      console.error('Error creating book:', err);
      if (err.code === 11000) {
        return res.status(400).json({ 
          error: 'A book with this title already exists. Please try again with a different title.' 
        });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json({ books, success: true,
    message: 'Books fetched successfully',
  });
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).json({ book, success: true,
    message: 'Book fetched successfully',
  });
};

exports.updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      summary,
      metaTitle,
      metaDescription,
      metaKeywords,
      genre,
      categories,
      affiliateLink,
      publicationDate,
      rating,
      reviews,
    } = req.body;

    // Find the existing book to check if summary has changed
    const existingBook = await Book.findById(req.params.id);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if summary has changed and regenerate audio if needed
    let audioUri = existingBook.audioUri;
    if (summary && summary !== existingBook.summary) {
      console.log('Summary changed, regenerating audio...');
      const newAudioPath = await generateAudio(summary, title || existingBook.title);
      if (newAudioPath) {
        audioUri = newAudioPath;
        console.log(`New audio generated: ${newAudioPath}`);
      } else {
        console.error('Audio generation failed');
      }
    }

    const book = await Book.findByIdAndUpdate(req.params.id, {
      title,
      author,
      description,
      summary,
      metaTitle,
      metaDescription,
      metaKeywords,
      genre,
      categories,
      affiliateLink,
      publicationDate,
      rating,
      reviews,
      audioUri,
      updatedAt: Date.now(),
    }, { new: true });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      message: summary !== existingBook.summary ? 'Book updated with new audio generated' : 'Book updated successfully',
      book,
      success: true
    });

  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Delete all book-related data
    await Promise.all([
      // Delete all comments for this book
      Comment.deleteMany({ bookId: bookId }),
      
      // Delete all favorite entries for this book
      FavBooks.deleteMany({ bookId: bookId }),
      
      // Delete the book
      Book.findByIdAndDelete(bookId)
    ]);

    res.json({ 
      message: 'Book and all related data deleted successfully', 
      success: true 
    });

  } catch (err) {
    console.error('Delete book error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


