const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  description: {
    type: String,
  },
  summary: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  genre: {
    type: String,
  },
  categories: {
    type: [String],
  },
  affiliateLink: {
    type: String,
  },
  publicationDate: {
    type: Date,
  },
  rating: {
    type: Number,
    default:0
  },
  reviews: {
    type: Number,
    default:0
  },
  audioUri: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
module.exports = mongoose.model('Book', bookSchema);
