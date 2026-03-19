// Centralized configuration for the application, including environment variables and default values.

import 'dotenv/config';

const config = {
    env: process.env.NODE_ENV || 'DEVELOPMENT', // Environment (development, production, etc.)
    port: process.env.PORT || 3000, // Server port
    jwtSecret: process.env.JWT_SECRET, // Secret key for JWT
    mongoDBUri: process.env.MONGODB_URI, // DB connection string
    mongoDBName: process.env.DB_NAME // Database name
}

export default config;