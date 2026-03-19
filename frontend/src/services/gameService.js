import api from './api';

// Game service for handling all game-related API requests

// Fetch all games (for library or admin)
const getAllGames = () => {
    return api.get('/games');
};

// Fetch a single game by ID
const getGameById = (id) => {
    return api.get(`/games/${id}`);
};

// Admin: Create a new game
const createGame = (gameData) => {
    return api.post('/admin/games', gameData);
};

// Admin: Update an existing game
const updateGame = (id, gameData) => {
    return api.put(`/admin/games/${id}`, gameData);
};

// Admin: Delete a game
const deleteGame = (id) => {
    return api.delete(`/admin/games/${id}`);
};

// Get current user's game collection
const getMyCollection = () => {
    return api.get('/users/me/games');
};

// Add a game to current user's collection
const addToCollection = (gameId) => {
    return api.post(`/users/games/${gameId}`);
};

// Remove a game from current user's collection
const removeFromCollection = (gameId) => {
    return api.delete(`/users/games/${gameId}`);
};

export default {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    getMyCollection,
    addToCollection,
    removeFromCollection
};
