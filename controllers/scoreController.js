const { body, validationResult } = require('express-validator');
const Score = require('../models/Score');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    next();
};

exports.createOrUpdateScore = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { questionId, component, category, subcategory, score, comment } = req.body;

        const result = await Score.create(
            userId,
            questionId,
            component,
            category,
            subcategory,
            score,
            comment
        );

        res.status(201).json({ message: 'Score created successfully', score: result });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ message: 'Error saving score', error: error.message });
    }
};
exports.getScoresByCategory = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { category } = req.params;

        const scores = await Score.findByCategory(userId, category);

        res.status(200).json({ scores });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};
