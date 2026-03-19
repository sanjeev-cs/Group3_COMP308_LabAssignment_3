import User from '../models/user.server.model.js';

// Allow access only for admin users
const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id); // req.user set by authMiddleware
        
        if (user?.role === 'admin') {
            next();
        } else {
            res.status(403).json({ error: 'Access denied. Admins only.' });
        }
    } catch {
        res.status(500).json({ error: 'Server Error in Admin Check' });
    }
};

export default adminMiddleware;
