import express from 'express';
import games from '../controllers/game.server.controller.js';

const router = express.Router();

// Public routes: /api/games
router.get('/', games.listAll);
router.get('/:gameId', games.getById); // Note: Project spec asked for /:id, but controller expects gameId

export default router;