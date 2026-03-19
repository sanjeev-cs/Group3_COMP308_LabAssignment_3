// Middleware to authenticate JWT from HTTP-only cookies

import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authMiddleware = (req, res, next) => {
    // Read the token from the HTTP-only cookie
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try{
        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Attach user info from token to request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

export default authMiddleware;