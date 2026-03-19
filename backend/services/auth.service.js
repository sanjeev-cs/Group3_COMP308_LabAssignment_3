import jwt from 'jsonwebtoken';
import User from '../models/user.server.model.js';
import config from '../config/config.js';

// Generate JWT for a user
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        config.jwtSecret,
        { expiresIn: '1d' }
    );
};

// Register a new user
const register = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return {
            user: { id: user._id, username: user.username, role: user.role },
            token: generateToken(user)
        };
    } catch (error) {
        // Handle duplicate username
        if (error.code === 11000 || (error.message && error.message.includes('duplicate key'))) {
            throw { status: 400, message: 'Username already exists' };
        }
        throw error;
    }
};

// Authenticate user
const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw { status: 401, message: 'Invalid credentials' };

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

    return {
        user: { id: user._id, username: user.username, role: user.role },
        token: generateToken(user)
    };
};

export default { register, login };
