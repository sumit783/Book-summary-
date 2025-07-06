const express = require('express');
const router = express.Router();
const { createBook, getBooks,updateBook,deleteBook } = require('../controllers/bookController');
const upload = require('../middlewares/upload');

router.post('/books/', upload.single('coverImage'), createBook);
router.get('/books/', getBooks);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;

