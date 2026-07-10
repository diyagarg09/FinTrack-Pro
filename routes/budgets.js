const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Budget = require('../models/Budget');

// GET /api/budgets — get all budgets for user
router.get('/', auth, async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.userId });
        // Convert to object format { category: limit }
        const budgetMap = {};
        budgets.forEach(b => { budgetMap[b.category] = b.limit; });
        res.json(budgetMap);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// POST /api/budgets — set/update budget for a category
router.post('/', auth, async (req, res) => {
    try {
        const { category, limit } = req.body;

        if (!category) {
            return res.status(400).json({ message: 'Category is required.' });
        }

        if (!limit || limit <= 0) {
            // Delete budget if limit is 0 or invalid
            await Budget.findOneAndDelete({ userId: req.userId, category });
            return res.json({ message: 'Budget cleared.' });
        }

        const budget = await Budget.findOneAndUpdate(
            { userId: req.userId, category },
            { limit: parseFloat(limit) },
            { upsert: true, new: true }
        );

        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// DELETE /api/budgets/:category — clear budget for a category
router.delete('/:category', auth, async (req, res) => {
    try {
        await Budget.findOneAndDelete({
            userId: req.userId,
            category: decodeURIComponent(req.params.category)
        });
        res.json({ message: 'Budget cleared.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = router;
