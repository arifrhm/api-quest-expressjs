import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  res.json({ status: 'API Quest Ready' });
}));

router.get('/ping', asyncHandler(async (req, res) => {
  res.status(200).json({ success: true });
}));

router.post('/echo', asyncHandler(async (req, res) => {
  res.json(req.body);
}));

export default router;
