// Sets up logging, security, and parsing JSON data before reaching their routes.

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from './config.js';
import jwt from 'jsonwebtoken';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

import typeDefs from '../graphql/typeDefs.js';
import resolvers from '../graphql/resolvers.js';

// Routes
import userRoutes from '../routes/user.server.routes.js';
import gameRoutes from '../routes/game.server.routes.js';
import adminRoutes from '../routes/admin.server.routes.js';

const configureExpress = async () => {
    const app = express();

    // Middleware: Tools required before handling a request
    // Logging (dev only)
    if (config.NODE_ENV === 'DEVELOPMENT') {
        app.use(morgan('dev'));
    }

    // Core middleware
    app.use(express.json()); // Parse JSON data
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
    app.use(cookieParser()); // Parse cookies
    
    // CORS : Allows React to talk to backend
    app.use(
        cors({ 
            origin: [
                process.env.FRONTEND_URL, 
                'http://localhost:5173', 
                'http://localhost:5174'
            ].filter(Boolean), 
            credentials: true 
        })
    );

    // Serve Static Files (Uploaded Images)
    app.use('/uploads', express.static('uploads'));

    // Setup Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    
    await server.start();
    
    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => {
            let user = null;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                try {
                    const token = req.headers.authorization.split(' ')[1];
                    const decoded = jwt.verify(token, config.jwtSecret);
                    user = decoded;
                } catch (error) {
                    console.error('Auth verify error:', error.message);
                }
            }
            return { user };
        }
    }));

    // Mount REST routes (Keeping for backward compatibility or Admin use if needed)
    app.use('/api/games', gameRoutes); // Public read-only
    app.use('/api/users', userRoutes); // User actions
    app.use('/api/admin', adminRoutes); // Admin actions

    // Global error handler (catches errors from routes)
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(err.status || 500).json({
            message: err.message || 'Internal Server Error'
        })
    })

    return app;
}

export default configureExpress;