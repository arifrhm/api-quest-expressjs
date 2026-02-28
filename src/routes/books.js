import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import * as booksController from '../controllers/booksController.js';

const router = express.Router();

router.get('/', asyncHandler(booksController.getBooks));
router.post('/', asyncHandler(booksController.createBook));
router.get('/:id', asyncHandler(booksController.getBookById));
router.put('/:id', asyncHandler(booksController.updateBook));
router.delete('/:id', asyncHandler(booksController.deleteBook));

export default router;
