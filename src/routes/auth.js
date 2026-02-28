import express from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateCredentials, generateAccessToken } from '../services/authService.js';

const router = express.Router();

router.post('/token', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      detail: 'Username and password are required'
    });
  }

  if (!validateCredentials(username, password)) {
    return res.status(401).json({
      detail: 'Invalid credentials'
    });
  }

  const accessToken = generateAccessToken();

  res.json({
    token: accessToken,
    token_type: 'bearer'
  });
}));

export default router;
