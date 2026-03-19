import User from '../models/user.server.model.js';
import Game from '../models/game.server.model.js';

// Get user info without password
const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
};

// Get all games in user's collection
const getUserCollection = async (userId) => {
    const user = await User.findById(userId).populate('games');
    if (!user) throw { status: 404, message: 'User not found' };
    return user.games;
};

// Add a game to user's collection
const addToCollection = async (userId, gameId) => {
    const game = await Game.findById(gameId);
    if (!game) throw { status: 404, message: 'Game not found' };

    const user = await User.findById(userId);
    if (!user) throw { status: 404, message: 'User not found' };

    if (user.games.includes(gameId)) throw { status: 400, message: 'Game already in collection' };

    user.games.push(gameId);
    await user.save();
    return await user.populate('games'); // Return updated collection
};

// Remove a game from user's collection
const removeFromCollection = async (userId, gameId) => {
    const user = await User.findById(userId);
    if (!user) throw { status: 404, message: 'User not found' };

    user.games = user.games.filter(id => id.toString() !== gameId);
    await user.save();
    return await user.populate('games');
};

export default {
    getUserProfile,
    getUserCollection,
    addToCollection,
    removeFromCollection
};
