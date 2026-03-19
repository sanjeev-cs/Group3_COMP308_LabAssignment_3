import express from 'express';
import user from '../controllers/user.server.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public auth routes
router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);

// Protected user info
router.get('/info', authMiddleware, user.getInfo);

// User collection
router.get('/me/games', authMiddleware, user.getCollection);
router.post('/games/:gameId', authMiddleware, user.addToCollection);
router.delete('/games/:gameId', authMiddleware, user.removeFromCollection);

export default router;
