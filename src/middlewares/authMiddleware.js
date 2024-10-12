const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/BlackListToken'); // Adjust the path as needed

// Middleware to check JWT token
const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Check if the token is blacklisted
    try {
        const blacklisted = await BlacklistToken.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token has been blacklisted' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error while checking blacklist', error: error.message });
    }

    // Verify the JWT token using the stored JWT_SECRET
    jwt.verify(token, req.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // Store user ID in request object for use in subsequent routes
        req.userId = decoded.id;
        next();
    });
};

// Export functions for user’s application
module.exports = authMiddleware;
