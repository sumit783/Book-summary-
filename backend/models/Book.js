const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: String,
  summary: String,
   coverImageUrl: String,
  metaTitle: String,
  metaDescription: String,
  affiliateLink: String,
  audioUrl: String, // URL to Backblaze B2 stored audio
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
