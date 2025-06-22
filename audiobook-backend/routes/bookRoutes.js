const express = require('express');
const router = express.Router();
const { createBook, getBooks } = require('../controllers/bookController');
const upload = require('../middlewares/upload');

router.post('/books/', upload.single('coverImage'), createBook);
router.get('/books/', getBooks);

module.exports = router;

