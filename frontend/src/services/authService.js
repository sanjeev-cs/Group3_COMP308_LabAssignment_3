import api from './api';

// Auth service for handling user authentication requests

// Register a new user
const register = (userData) => {
    return api.post('/users/register', userData);
};

// Login user with credentials
const login = (credentials) => {
    return api.post('/users/login', credentials);
};

// Logout current user
const logout = () => {
    return api.post('/users/logout');
};

// Get current logged-in user info
const getInfo = () => {
    return api.get('/users/info');
};

export default {
    register,
    login,
    logout,
    getInfo
};
