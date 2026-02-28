import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './src/middleware/errorHandler.js';
import indexRoutes from './src/routes/index.js';
import authRoutes from './src/routes/auth.js';
import booksRoutes from './src/routes/books.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`API Quest server running on port ${PORT}`);
});
