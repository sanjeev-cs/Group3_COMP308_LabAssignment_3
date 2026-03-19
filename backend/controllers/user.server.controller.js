import authService from '../services/auth.service.js';
import userService from '../services/user.service.js';

// Register a new user and set HTTP-only cookie
const register = async (req, res) => {
    try {
        const { user, token } = await authService.register(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PRODUCTION',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

// Login user and set HTTP-only cookie
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await authService.login(username, password);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PRODUCTION',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json(user);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

// Logout user (clear cookie)
const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

// Get current user info
const getInfo = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

// Get user's game collection
const getCollection = async (req, res) => {
    try {
        const games = await userService.getUserCollection(req.user.id);
        res.json(games);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

// Add game to user's collection
const addToCollection = async (req, res) => {
    try {
        const games = await userService.addToCollection(req.user.id, req.params.gameId);
        res.json(games);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

// Remove game from user's collection
const removeFromCollection = async (req, res) => {
    try {
        const games = await userService.removeFromCollection(req.user.id, req.params.gameId);
        res.json(games);
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

export default {
    register,
    login,
    logout,
    getInfo,
    getCollection,
    addToCollection,
    removeFromCollection
};
