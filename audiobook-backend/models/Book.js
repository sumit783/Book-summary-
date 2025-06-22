const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
  metaTitle: String,
  metaDescription: String,
  affiliateLink: String,
  coverImage: String,
  audioUri: String,
  slug: { type: String, unique: true }
});
module.exports = mongoose.model('Book', bookSchema);
