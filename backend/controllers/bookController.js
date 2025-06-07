const Book = require('../models/Book');
const generateSlug = require('../utils/generateSlug');
const { generateAudioElevenLabs } = require('../services/elevenLabs');
const { generateAudioVoiceRss } = require('../services/voiceRss');
const { generateAudioGoogleTranslate } = require('../services/googleTranslateTTS');
const { uploadAudio, uploadImage,generateSignedUrl } = require('../services/backblaze');

const crypto = require('crypto');
const path = require('path'); // Add this at the top

async function createBook(req, res) {
  try {
    const {
      title,
      author,
      summary,
      metaTitle,
      metaDescription,
      affiliateLink
    } = req.body;

    // Use req.file for cover image if using multer
    const coverImage = req.file;

    if (!title || !summary) {
      return res.status(400).json({ message: 'Title and summary are required.' });
    }
    if (!coverImage) {
      return res.status(400).json({ message: 'Cover image is required.' });
    }

    const slug = generateSlug(title);

    // Check if slug exists
    const existing = await Book.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'Book with this title already exists.' });
    }

    // Generate audio buffer with fallback logic
    let audioBuffer;

    try {
      audioBuffer = await generateAudioElevenLabs(summary);
      console.log('Audio generated with ElevenLabs');
    } catch {
      try {
        audioBuffer = await generateAudioVoiceRss(summary);
        console.log('Audio generated with Voice RSS');
      } catch {
        audioBuffer = await generateAudioGoogleTranslate(summary);
        console.log('Audio generated with Google Translate TTS');
        // If all services fail, throw an error
      }
    }

    // Generate unique filename
    const filename = `audio_${slug}_${crypto.randomBytes(6).toString('hex')}.mp3`;

    // Upload audio to Backblaze
    const audioUrl = await uploadAudio(audioBuffer, filename);

    // Get extension from original filename
    const ext = path.extname(coverImage.originalname) || '.png'; // fallback to .png if missing
    const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, ''); // sanitize slug for filename
    const coverFileName = `cover_${safeSlug}_${crypto.randomBytes(6).toString('hex')}${ext}`;

    // Upload cover image to B2 with extension
    const coverUpload = await uploadImage(coverImage.path, coverFileName);

    // Save book to DB
    const book = new Book({
      title,
      slug,
      author,
      summary,
      metaTitle,
      coverImageUrl: coverUpload,
      metaDescription,
      affiliateLink,
      audioUrl
    });

    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getBooks(req, res) {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    // Map over books to generate signed URLs for cover images and audio file
    // Return books with signed URLs
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getBookBySlug(req, res) {
  try {
    const { slug } = req.params;
    const book = await Book.findOne({ slug });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const getBookById = async (req, res) => {
  try {
    console.log(`Fetching book with ID: ${req.params.id}`);
    const book = await Book.findById(req.params.id);
    console.log(`Fetching book with ID: ${req.params.id}`);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Generate signed URLs if file names exist
    
    const coverImageUrl = book.coverImage ? await generateSignedUrl(book.coverImage) : null;
    const audioUrl = book.audioFile ? await generateSignedUrl(book.audioFile) : null;

    res.json({
      ...book.toObject(),
      coverImageUrl,
      audioUrl,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookBySlug,
  getBookById
};
