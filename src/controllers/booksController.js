import store from '../storage/memoryStore.js';
import { ValidationError, NotFoundError } from '../middleware/errorHandler.js';

function validateBookData(data) {
  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    throw new ValidationError('Title is required and must be a non-empty string');
  }
  if (!data.author || typeof data.author !== 'string' || !data.author.trim()) {
    throw new ValidationError('Author is required and must be a non-empty string');
  }
}

export async function createBook(req, res) {
  validateBookData(req.body);

  const book = store.addBook({
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    year: req.body.year
  });

  res.status(201).json(book);
}

export async function getBooks(req, res) {
  const books = store.getAllBooks();
  res.json(books);
}

export async function getBookById(req, res) {
  const book = store.getBookById(req.params.id);

  if (!book) {
    throw new NotFoundError('Book not found');
  }

  res.json(book);
}

export async function updateBook(req, res) {
  const { id } = req.params;
  const existingBook = store.getBookById(id);

  if (!existingBook) {
    throw new NotFoundError('Book not found');
  }

  if (req.body.title !== undefined && typeof req.body.title !== 'string') {
    throw new ValidationError('Title must be a string');
  }
  if (req.body.author !== undefined && typeof req.body.author !== 'string') {
    throw new ValidationError('Author must be a string');
  }

  const updateData = {};
  if (req.body.title !== undefined) {
    updateData.title = req.body.title.trim();
  }
  if (req.body.author !== undefined) {
    updateData.author = req.body.author.trim();
  }

  const updatedBook = store.updateBook(id, updateData);
  res.json(updatedBook);
}

export async function deleteBook(req, res) {
  const { id } = req.params;
  const deleted = store.deleteBook(id);

  if (!deleted) {
    throw new NotFoundError('Book not found');
  }

  res.json({ message: 'deleted' });
}
