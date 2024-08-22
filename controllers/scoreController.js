const { body, validationResult } = require('express-validator');
const Score = require('../models/Score');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    next();
};

exports.createOrUpdateScore = [
    body('category').isString().notEmpty().withMessage('Category is required'),
    body('subcategory').isString().notEmpty().withMessage('Subcategory is required'),
    body('score').isInt({ min: 0, max: 4 }).withMessage('Score must be between 0 and 4'),
    body('comments').optional().isString(),
    handleValidationErrors,
    async (req, res) => {
        try {
            const userId = req.userData.userId;
            const { category, subcategory, score, comments } = req.body;

            const existingScore = await Score.findByUserCategorySubcategory(userId, category, subcategory);

            let result;
            if (existingScore) {
                result = await Score.update(existingScore.id, score, comments);
                res.status(200).json({ message: 'Score updated successfully', score: result });
            } else {
                result = await Score.create(userId, category, subcategory, score, comments);
                res.status(201).json({ message: 'Score created successfully', score: result });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error saving score', error: error.message });
        }
    }
];

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
