const Book = require('../models/Book');
const slugify = require('slugify');
const generateAudio = require('../services/ttsService');

exports.createBook = async (req, res) => {
    try {
      const {
        title,
        author,
        summary,
        metaTitle,
        metaDescription,
        affiliateLink
      } = req.body;
  
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
        summary,
        metaTitle,
        metaDescription,
        affiliateLink,
        coverImage: coverImagePath,
        audioUri: audioPath,
        slug
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
  res.json(books);
};
