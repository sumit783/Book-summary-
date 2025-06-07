require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/bookRoutes');
const sitemapRoutes = require('./routes/sitemapRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/sitemap', sitemapRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;

