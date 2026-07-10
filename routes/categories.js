const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

// GET /api/categories — get categories for user
router.get('/', auth, async (req, res) => {
    try {
        let categoryDoc = await Category.findOne({ userId: req.userId });
        if (!categoryDoc) {
            categoryDoc = new Category({ userId: req.userId });
            await categoryDoc.save();
        }
        res.json(categoryDoc.categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// POST /api/categories — add a new category
router.post('/', auth, async (req, res) => {
    try {
        const { name } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Category name is required.' });
        }

        let categoryDoc = await Category.findOne({ userId: req.userId });
        if (!categoryDoc) {
            categoryDoc = new Category({ userId: req.userId });
        }

        if (categoryDoc.categories.includes(name.trim())) {
            return res.status(409).json({ message: 'Category already exists.' });
        }

        categoryDoc.categories.push(name.trim());
        await categoryDoc.save();

        res.status(201).json(categoryDoc.categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// DELETE /api/categories/:name — remove a category
router.delete('/:name', auth, async (req, res) => {
    try {
        const categoryName = decodeURIComponent(req.params.name);

        // Check if category is used in any transactions
        const usedInTx = await Transaction.findOne({ userId: req.userId, category: categoryName });
        if (usedInTx) {
            return res.status(400).json({ message: `Cannot delete "${categoryName}" — it is used in existing transactions.` });
        }

        await Category.findOneAndUpdate(
            { userId: req.userId },
            { $pull: { categories: categoryName } }
        );

        const updated = await Category.findOne({ userId: req.userId });
        res.json(updated.categories);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = router;
