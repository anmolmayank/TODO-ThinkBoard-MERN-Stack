import express from 'express';
import { register, login, refresh, logout } from '../controllers/authController.js';
import { rateLimiter } from '../middleware/rateLimiter.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

// Routes with rate limiter applied
router.post('/register', rateLimiter, register);
router.post('/login', rateLimiter, login);
router.post('/refresh', authenticateToken, rateLimiter, refresh);
router.post('/logout', authenticateToken, rateLimiter, logout);

export default router;
