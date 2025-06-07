const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookBySlug,
  getBookById
} = require('../controllers/bookController');

const upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('coverImage'), createBook);
router.get('/', getBooks);
router.get('/:slug', getBookBySlug);
router.get('/:id', getBookById);

module.exports = router;
