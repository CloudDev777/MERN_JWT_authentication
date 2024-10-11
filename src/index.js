const express = require('express');
const connectDB = require('./config/db');  // MongoDB connection logic
const authRoutes = require('./routes/authRoutes');

// Function to initialize the library with user configuration
const initAuthLibrary = (config) => {
    const app = express();
    app.use(express.json());

    // Allow the user to initialize MongoDB in their app
    const mongoURI = config.mongoURI || process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error("MongoDB URI is required.");
    }
    connectDB(mongoURI); // Connect to MongoDB with user-provided URI

    app.use((req, res, next) => {
        req.jwtSecret = config.jwtSecret || process.env.JWT_SECRET;  // Attach JWT secret to the request object
        next();
    });

    // Register auth routes
    app.use('/auth', authRoutes);

    return app;
};


// Export functions for user’s application
module.exports =  initAuthLibrary;
