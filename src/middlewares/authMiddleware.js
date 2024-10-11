const jwt = require('jsonwebtoken');

// Middleware to check JWT token
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the JWT token using the stored JWT_SECRET
    jwt.verify(token, req.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

           // Log the decoded token for debugging
           console.log('Decoded JWT:', decoded);

        // Store user ID in request object for use in subsequent routes
        req.userId = decoded.id;
        next();
    });
};

// Export functions for user’s application
module.exports =  authMiddleware;