import express from 'express';
import games from '../controllers/game.server.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';
import upload from '../config/multer.config.js';

const router = express.Router();

// Admin Game Routes: /api/admin/games
// Create Game
router.post('/games', authMiddleware, adminMiddleware, upload.single('image'), games.create);

// Update Game
router.put('/games/:gameId', authMiddleware, adminMiddleware, upload.single('image'), games.update);

// Delete Game
router.delete('/games/:gameId', authMiddleware, adminMiddleware, games.remove);

export default router;
