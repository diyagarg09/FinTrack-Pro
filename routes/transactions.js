const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// GET /api/transactions — get all transactions for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// POST /api/transactions — add new transaction
router.post('/', auth, async (req, res) => {
    try {
        const { type, description, amount, date, category } = req.body;

        if (!type || !description || !amount || !date || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0.' });
        }

        const transaction = new Transaction({
            userId: req.userId,
            type,
            description,
            amount: parseFloat(amount),
            date,
            category
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// DELETE /api/transactions/:id — delete a transaction
router.delete('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found.' });
        }

        res.json({ message: 'Transaction deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = router;
