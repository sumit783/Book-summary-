const express = require('express');
const router = express.Router();
const { createBook, getBooks,updateBook,deleteBook,getBookById } = require('../controllers/bookController');
const upload = require('../middlewares/upload');
const verifySupabaseToken = require("../middlewares/adminAuth");

router.post('/books/',verifySupabaseToken, upload.single('coverImage'), createBook);
router.get('/books', getBooks);
router.put('/books/:id',verifySupabaseToken, updateBook);
router.delete('/books/:id',verifySupabaseToken, deleteBook);
router.get('/books/:id', getBookById);
module.exports = router;

