const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    categories: {
        type: [String],
        default: ['Food & Dining', 'Shopping', 'Recharge & Bills', 'Petrol & Auto', 'Utilities', 'Salary', 'Entertainment', 'Other']
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
