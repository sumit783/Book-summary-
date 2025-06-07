const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const xml = require('xml');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const books = await Book.find();

    const urlset = books.map((book) => ({
      url: [
        { loc: `${process.env.DOMAIN}/books/${book.slug}` },
        { lastmod: book.createdAt.toISOString() },
        { changefreq: 'weekly' },
        { priority: 0.8 }
      ]
    }));

    const sitemapObject = {
      urlset: [
        { _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } },
        ...urlset
      ]
    };

    const sitemapXml = xml(sitemapObject, { declaration: true });

    res.header('Content-Type', 'application/xml');
    res.send(sitemapXml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Server error');
  }
});

router.get('/robots.txt', (req, res) => {
  const content = `
User-agent: *
Allow: /

Sitemap: ${process.env.DOMAIN}/api/sitemap/sitemap.xml
  `.trim();

  res.header('Content-Type', 'text/plain');
  res.send(content);
});

module.exports = router;
