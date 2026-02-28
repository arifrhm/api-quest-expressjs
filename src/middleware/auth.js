import { validateToken } from '../services/authService.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      detail: 'Invalid or missing authentication credentials'
    });
  }

  const token = authHeader.substring(7);

  if (!validateToken(token)) {
    return res.status(401).json({
      detail: 'Invalid authentication credentials'
    });
  }

  next();
}
