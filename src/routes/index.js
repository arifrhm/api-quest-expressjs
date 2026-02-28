import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  res.json({ status: 'API Quest Ready' });
}));

router.get('/ping', asyncHandler(async (req, res) => {
  res.json({ message: 'pong' });
}));

router.post('/echo', asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (message === undefined) {
    return res.status(422).json({
      detail: 'Message field is required'
    });
  }

  res.json({ echo: message });
}));

export default router;
