const { body, validationResult } = require('express-validator');
const Score = require('../models/Score');

exports.createOrUpdateScore = async (req, res) => {
    try {
        const userId = req.userData.userId;
        console.log('Saving score for user:', userId);
        console.log('Score data:', req.body);

        const result = await Score.create(
            userId,
            req.body.questionId,
            req.body.component,
            req.body.category,
            req.body.subcategory,
            req.body.score,
            req.body.comment
        );

        console.log('Score saved:', result);
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
        // console.log('userId:', userId, 'category:', category); // Log the parameters

        if (userId === undefined || category === undefined) {
            throw new Error('Missing required parameters');
        }

        const scores = await Score.findByCategory(userId, category);
        res.status(200).json({ scores });
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};

exports.displayScores = async (req, res) => {
    try {
        const userId = req.userData.userId;
        console.log('Fetching scores for userId:', userId);

        const latestScores = await Score.findByCategory(userId);
        console.log('Latest scores:', latestScores);

        res.status(200).json({ scores: latestScores });
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};




