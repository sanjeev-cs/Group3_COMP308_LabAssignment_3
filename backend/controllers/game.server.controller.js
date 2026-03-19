import gameService from '../services/game.service.js';

const listAll = async (req, res) => {
    try {
        const games = await gameService.getAllGames();
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const game = await gameService.getGameById(req.params.gameId);
        res.json(game);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const gameData = req.body;
        if (req.file) {
            gameData.imageUrl = `/uploads/${req.file.filename}`;
        }
        
        const game = await gameService.createGame(gameData);
        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const gameData = req.body;
        if (req.file) {
            gameData.imageUrl = `/uploads/${req.file.filename}`;
        }

        const game = await gameService.updateGame(req.params.gameId, gameData);
        res.json(game);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const result = await gameService.deleteGame(req.params.gameId);
        res.json(result);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

export default {
    listAll,
    getById,
    create,
    update,
    remove
};