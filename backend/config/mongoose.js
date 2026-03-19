// This file sets up the connection to MongoDB using Mongoose.

import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
    // Allow queries to include fields not present in the Schema
    mongoose.set('strictQuery', false);

    // Connect to MongoDB using the URI from config
    try{
        const conn = await mongoose.connect(config.mongoDBUri, {
            dbName: config.mongoDBName,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;