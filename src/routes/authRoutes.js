// src/routes/authRoutes.js
const express = require('express');
const { register, login, getProfile, signout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Signout route
router.post('/signout', signout);

// Profile data route (requires authentication)
router.get('/me', authMiddleware, getProfile);

module.exports = router;
