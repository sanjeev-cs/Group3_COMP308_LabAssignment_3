// Define the server entry point and set up Express, Mongoose, and routes

import config from './config/config.js';
import connectDB from './config/mongoose.js';
import configureExpress from './config/express.js';

// Connect to MongoDB
await connectDB();

// Create and configure Express app
const app = await configureExpress();

// Start server
app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});

export default app;