const express = require('express');
const router = express.Router();
const { createBook, getBooks,updateBook,deleteBook,getBookById } = require('../controllers/bookController');
const upload = require('../middlewares/upload');
const verifySupabaseToken = require("../middlewares/adminAuth");
const auth = require('../middlewares/auth');
const {addFavBook,updateBookPlayCount} = require('../controllers/bookController');

router.post('/books/',verifySupabaseToken, upload.single('coverImage'), createBook);
router.get('/books', getBooks);
router.put('/books/:id',verifySupabaseToken, upload.single('coverImage'), updateBook);
router.delete('/books/:id',verifySupabaseToken, deleteBook);
router.get('/books/:id', getBookById);
router.post('/books/fav',auth, addFavBook);
router.post('/books/play', updateBookPlayCount);
module.exports = router;

