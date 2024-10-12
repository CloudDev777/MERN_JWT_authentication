// src/controllers/authController.js
const User = require('../models/User');
const BlacklistToken = require('../models/BlackListToken');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { name, email, phone, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, phone, password });
        await user.save();

        const token = generateToken(user._id, req.jwtSecret);
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }



        const token = generateToken(user._id, req.jwtSecret);
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


const signout = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the request

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        // Add the token to the blacklist
        const blacklistedToken = new BlacklistToken({ token });
        await blacklistedToken.save();

        return res.status(200).json({ message: 'User successfully signed out' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get the authenticated user's profile
// Get the authenticated user's profile
const getProfile = async (req, res) => {
    try {
        // Log the request for debugging (but do not send it as JSON)
        console.log('User ID from token:', req.userId);
        
        // Get the user ID from the token
        const user = await User.findById(req.userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send back only the user object, without any circular references
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Generate a JWT token
const generateToken = (id, secret) => {
    return jwt.sign({ id }, secret, { expiresIn: '6h' });
};

module.exports = { register, login, signout, getProfile };
