const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Category = require('../models/Category');

// Helper to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }
        if (password.length < 4) {
            return res.status(400).json({ message: 'Password must be at least 4 characters.' });
        }

        const existingUser = await User.findOne({ username: username.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists. Please choose another.' });
        }

        const user = new User({ username: username.toLowerCase().trim(), password, name: username });
        await user.save();

        // Create default categories for new user
        const defaultCategories = new Category({ userId: user._id });
        await defaultCategories.save();

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                currency: user.currency,
                darkMode: user.darkMode
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const user = await User.findOne({ username: username.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                currency: user.currency,
                darkMode: user.darkMode
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// PUT /api/auth/profile — update settings
router.put('/profile', require('../middleware/auth'), async (req, res) => {
    try {
        const { name, currency, darkMode } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, currency, darkMode },
            { new: true }
        );
        res.json({
            id: user._id,
            username: user.username,
            name: user.name,
            currency: user.currency,
            darkMode: user.darkMode
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = router;
